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

export const updateQuantity = mutation({
  args: {
    id: v.id('cart'),
    quantity: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      quantity: args.quantity,
    });
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
