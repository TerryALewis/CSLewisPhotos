# Convex Integration Steps for CSLewisPhotos

This document outlines the steps to integrate Convex database into the CSLewisPhotos Nuxt.js application.

## Prerequisites

- Node.js and npm installed
- Existing Nuxt.js project (CSLewisPhotos)
- Convex account (sign up at https://convex.dev)

## Step 1: Install Convex

```bash
npm install convex
```

## Step 2: Initialize Convex in Your Project

```bash
npx convex dev
```

This command will:

- Create a `convex/` directory in your project root
- Generate initial configuration files
- Prompt you to create a Convex account or log in

## Step 3: Set Up Convex Configuration

### Update `.env.local` (create if it doesn't exist)

```env
CONVEX_DEPLOYMENT=your-deployment-url
CONVEX_URL=your-convex-url
```

### Update `nuxt.config.ts`

Add Convex configuration to your Nuxt config:

```typescript
export default defineNuxtConfig({
  // ... existing config
  runtimeConfig: {
    public: {
      convexUrl: process.env.CONVEX_URL,
    },
  },
  plugins: ['~/plugins/convex.client.ts'],
});
```

## Step 4: Create Convex Plugin for Nuxt

Create `plugins/convex.client.ts`:

```typescript
import { ConvexHttpClient } from 'convex/browser';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const convex = new ConvexHttpClient(config.public.convexUrl);

  return {
    provide: {
      convex,
    },
  };
});
```

**Note:** We use `ConvexHttpClient` from `convex/browser` instead of `ConvexReactClient` because this is a Nuxt.js/Vue application, not a React application. The browser client provides the same functionality without React dependencies.

## Step 5: Define Database Schema

Create `convex/schema.ts`:

```typescript
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  photos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    category: v.string(), // "NC" or "TX"
    location: v.optional(v.string()),
    price: v.number(),
    isAvailable: v.boolean(),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index('by_category', ['category']),

  cart: defineTable({
    sessionId: v.string(),
    photoId: v.id('photos'),
    quantity: v.number(),
    addedAt: v.number(),
  })
    .index('by_session', ['sessionId'])
    .index('by_photo', ['photoId']),

  orders: defineTable({
    sessionId: v.string(),
    items: v.array(
      v.object({
        photoId: v.id('photos'),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.string(), // "pending", "completed", "cancelled"
    stripeSessionId: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_session', ['sessionId']),
});
```

## Step 6: Create Database Functions

### Create `convex/photos.ts`:

```typescript
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getPhotosByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('photos')
      .withIndex('by_category', (q) => q.eq('category', args.category))
      .filter((q) => q.eq(q.field('isAvailable'), true))
      .collect();
  },
});

export const getAllPhotos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('photos')
      .filter((q) => q.eq(q.field('isAvailable'), true))
      .collect();
  },
});

export const getPhotoById = query({
  args: { id: v.id('photos') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createPhoto = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    category: v.string(),
    location: v.optional(v.string()),
    price: v.number(),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('photos', {
      ...args,
      isAvailable: true,
      createdAt: Date.now(),
    });
  },
});
```

### Create `convex/cart.ts`:

```typescript
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getCartItems = query({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query('cart')
      .withIndex('by_session', (q) => q.eq('sessionId', args.sessionId))
      .collect();

    // Get photo details for each cart item
    const itemsWithPhotos = await Promise.all(
      cartItems.map(async (item) => {
        const photo = await ctx.db.get(item.photoId);
        return { ...item, photo };
      })
    );

    return itemsWithPhotos;
  },
});

export const addToCart = mutation({
  args: {
    sessionId: v.string(),
    photoId: v.id('photos'),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if item already exists in cart
    const existingItem = await ctx.db
      .query('cart')
      .withIndex('by_session', (q) => q.eq('sessionId', args.sessionId))
      .filter((q) => q.eq(q.field('photoId'), args.photoId))
      .first();

    if (existingItem) {
      // Update quantity
      return await ctx.db.patch(existingItem._id, {
        quantity: existingItem.quantity + args.quantity,
      });
    } else {
      // Add new item
      return await ctx.db.insert('cart', {
        ...args,
        addedAt: Date.now(),
      });
    }
  },
});

export const removeFromCart = mutation({
  args: { id: v.id('cart') },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const clearCart = mutation({
  args: { sessionId: v.string() },
  handler: async (ctx, args) => {
    const cartItems = await ctx.db
      .query('cart')
      .withIndex('by_session', (q) => q.eq('sessionId', args.sessionId))
      .collect();

    await Promise.all(cartItems.map((item) => ctx.db.delete(item._id)));
  },
});
```

## Step 7: Update Existing Stores

### Update `stores/catalog.ts`:

```typescript
import { api } from '~/convex/_generated/api';
import type { Doc } from '~/convex/_generated/dataModel';

export const useCatalogStore = defineStore('catalog', () => {
  const { $convex } = useNuxtApp();

  const ncPhotos = ref<Doc<'photos'>[]>([]);
  const txPhotos = ref<Doc<'photos'>[]>([]);
  const loading = ref(false);

  const loadNCPhotos = async () => {
    loading.value = true;
    try {
      ncPhotos.value = await $convex.query(api.photos.getPhotosByCategory, {
        category: 'NC',
      });
    } catch (error) {
      console.error('Error loading NC photos:', error);
    } finally {
      loading.value = false;
    }
  };

  const loadTXPhotos = async () => {
    loading.value = true;
    try {
      txPhotos.value = await $convex.query(api.photos.getPhotosByCategory, {
        category: 'TX',
      });
    } catch (error) {
      console.error('Error loading TX photos:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    ncPhotos: readonly(ncPhotos),
    txPhotos: readonly(txPhotos),
    loading: readonly(loading),
    loadNCPhotos,
    loadTXPhotos,
  };
});
```

### Update `stores/cart.ts`:

```typescript
import { api } from '~/convex/_generated/api';
import type { Doc, Id } from '~/convex/_generated/dataModel';

interface CartItemWithPhoto {
  _id: Id<'cart'>;
  sessionId: string;
  photoId: Id<'photos'>;
  quantity: number;
  addedAt: number;
  photo: Doc<'photos'> | null;
}

export const useCartStore = defineStore('cart', () => {
  const { $convex } = useNuxtApp();

  const items = ref<CartItemWithPhoto[]>([]);
  const sessionId = ref('');

  // Generate or retrieve session ID
  onMounted(() => {
    sessionId.value = localStorage.getItem('sessionId') || crypto.randomUUID();
    localStorage.setItem('sessionId', sessionId.value);
    loadCart();
  });

  const loadCart = async () => {
    try {
      items.value = await $convex.query(api.cart.getCartItems, {
        sessionId: sessionId.value,
      });
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (photoId: Id<'photos'>, quantity = 1) => {
    try {
      await $convex.mutation(api.cart.addToCart, {
        sessionId: sessionId.value,
        photoId,
        quantity,
      });
      await loadCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId: Id<'cart'>) => {
    try {
      await $convex.mutation(api.cart.removeFromCart, { id: itemId });
      await loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await $convex.mutation(api.cart.clearCart, {
        sessionId: sessionId.value,
      });
      items.value = [];
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalPrice = computed(() => {
    return items.value.reduce(
      (total, item) => total + (item.photo?.price || 0) * item.quantity,
      0
    );
  });

  return {
    items: readonly(items),
    sessionId: readonly(sessionId),
    addToCart,
    removeFromCart,
    clearCart,
    loadCart,
    totalPrice,
  };
});
```

## Step 8: Seed Initial Data

Create `convex/seed.ts`:

```typescript
import { internalMutation } from './_generated/server';

export const seedPhotos = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Sample NC photos
    const ncPhotos = [
      {
        title: 'NC Coast',
        description: 'Beautiful coastal scenery',
        imageUrl: '/images/NCCoast.jpg',
        category: 'NC',
        location: 'North Carolina Coast',
        price: 25.0,
        tags: ['coast', 'ocean', 'landscape'],
      },
      {
        title: 'NC Mountains',
        description: 'Scenic mountain views',
        imageUrl: '/images/NCMountains.jpg',
        category: 'NC',
        location: 'North Carolina Mountains',
        price: 25.0,
        tags: ['mountains', 'landscape', 'nature'],
      },
      {
        title: 'NC Foothills',
        description: 'Rolling hills of North Carolina',
        imageUrl: '/images/NCFoothills.jpg',
        category: 'NC',
        location: 'North Carolina Foothills',
        price: 25.0,
        tags: ['foothills', 'landscape', 'nature'],
      },
    ];

    // Sample TX photos
    const txPhotos = [
      {
        title: 'Texas Bluebonnets',
        description: 'Spring wildflowers in Texas',
        imageUrl: '/samplePhotos/Texas Bluebonnets.jpg',
        category: 'TX',
        location: 'Texas Hill Country',
        price: 25.0,
        tags: ['wildflowers', 'spring', 'texas'],
      },
      {
        title: 'Palo Duro Canyon',
        description: 'Stunning canyon views in Texas',
        imageUrl: '/samplePhotos/Palo Duro Canyon.jpg',
        category: 'TX',
        location: 'Palo Duro Canyon State Park',
        price: 30.0,
        tags: ['canyon', 'landscape', 'texas', 'desert'],
      },
      {
        title: 'West Texas Landscape',
        description: 'Vast open spaces of West Texas',
        imageUrl: '/samplePhotos/West Texas.jpg',
        category: 'TX',
        location: 'West Texas',
        price: 25.0,
        tags: ['landscape', 'desert', 'texas', 'open'],
      },
      {
        title: 'Texas Coast',
        description: 'Beautiful Texas coastline',
        imageUrl: '/samplePhotos/Texas Coast.jpg',
        category: 'TX',
        location: 'Texas Gulf Coast',
        price: 25.0,
        tags: ['coast', 'ocean', 'texas', 'beach'],
      },
      {
        title: 'Farm Houses',
        description: 'Rural Texas farm houses',
        imageUrl: '/samplePhotos/Farm Houses.jpg',
        category: 'TX',
        location: 'Rural Texas',
        price: 20.0,
        tags: ['rural', 'farm', 'texas', 'countryside'],
      },
      {
        title: 'Thunderstorm at Sunset',
        description: 'Dramatic storm clouds at sunset',
        imageUrl: '/samplePhotos/Thunderstorm at sunset 1.jpg',
        category: 'TX',
        location: 'Texas Plains',
        price: 35.0,
        tags: ['storm', 'sunset', 'dramatic', 'weather'],
      },
    ];

    // Insert photos
    for (const photo of [...ncPhotos, ...txPhotos]) {
      await ctx.db.insert('photos', {
        ...photo,
        isAvailable: true,
        createdAt: Date.now(),
      });
    }
  },
});
```

## Step 9: Deploy and Test

1. **Deploy your functions:**

   ```bash
   npx convex deploy
   ```

2. **Seed your database:**

   ```bash
   npx convex run seed:seedPhotos
   ```

3. **Start your development server:**
   ```bash
   npm run dev
   ```

## Step 10: Update Git Ignore

Add Convex-related files to `.gitignore`:

```gitignore
# Convex
.env.local
convex/_generated/
```

## Additional Considerations

1. **File Storage**: Consider using Convex file storage for images
2. **Authentication**: Implement user authentication if needed
3. **Real-time Updates**: Utilize Convex's real-time capabilities for cart updates
4. **Error Handling**: Add comprehensive error handling
5. **TypeScript**: Ensure proper TypeScript configuration for Convex

## Useful Commands

- `npx convex dev` - Start development mode
- `npx convex deploy` - Deploy to production
- `npx convex dashboard` - Open Convex dashboard
- `npx convex run functionName` - Run a specific function

## Resources

- [Convex Documentation](https://docs.convex.dev/)
- [Convex with Nuxt.js](https://docs.convex.dev/client/nuxt)
- [Convex Dashboard](https://dashboard.convex.dev/)
