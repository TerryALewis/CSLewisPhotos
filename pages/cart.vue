<template>
  <div class="bg-white">
    <!-- Local header removed; using global SiteHeader component -->

    <!-- Removed the page-local Mobile menu and Header to avoid duplicate navigation. -->

    <main
      class="mx-auto max-w-2xl px-4 pb-6 pt-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1 class="text-3xl font-bold tracking-tight text-[#159243] sm:text-4xl">
        Shopping Cart
      </h1>

      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul
            role="list"
            class="divide-y divide-gray-200 border-b border-t border-gray-200"
          >
            <li
              v-for="(item, itemIdx) in cart.items"
              :key="item.id"
              class="flex py-6 sm:py-10"
            >
              <div class="flex-shrink-0">
                <img
                  :src="item.photo?.imageUrl || ''"
                  :alt="item.photo?.title || 'Photo'"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                <div
                  class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                >
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          :href="item.photo?.imageUrl || '#'"
                          class="font-medium text-gray-700 hover:text-gray-800"
                          >{{ item.photo?.title || 'Photo' }}</a
                        >
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <!-- <p class="text-gray-500">{{ product.color }}</p> -->
                      <p v-if="item.imageSize" class="text-gray-500">
                        Size: {{ item.imageSize }}
                      </p>
                    </div>
                    <p class="mt-6 text-sm font-medium text-gray-900">
                      $ {{ item.photo?.price || 0 }}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${itemIdx}`" class="sr-only"
                      >Quantity, {{ item.photo?.title || 'Photo' }}</label
                    >
                    <select
                      :id="`quantity-${itemIdx}`"
                      :name="`quantity-${itemIdx}`"
                      :value="item.quantity"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-[#159243] focus:outline-none focus:ring-1 focus:ring-[#159243] sm:text-sm"
                      @change="changeCartItemQty(itemIdx, $event.target.value)"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>

                    <div class="absolute right-0 top-0">
                      <button
                        @click="removeCartItem(itemIdx)"
                        type="button"
                        class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <XMarkIconMini class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </div>

                <!-- <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                  <CheckIcon
                    v-if="product.inStock"
                    class="h-5 w-5 flex-shrink-0 text-green-500"
                    aria-hidden="true"
                  />
                  <ClockIcon
                    v-else
                    class="h-5 w-5 flex-shrink-0 text-gray-300"
                    aria-hidden="true"
                  />
                  <span>{{
                    product.inStock
                      ? 'In stock'
                      : `Ships in ${product.leadTime}`
                  }}</span>
                </p> -->
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
              <dt class="text-sm text-gray-600">Subtotal</dt>
              <dd class="text-sm font-medium text-gray-900">
                $ {{ cart.cartSubTotal.toFixed(2) }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex items-center text-sm text-gray-600">
                <span>Shipping estimate</span>
                <a
                  href="#"
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only"
                    >Learn more about how shipping is calculated</span
                  >
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                $ {{ cart.cartShippingTotal.toFixed(2) }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="flex text-sm text-gray-600">
                <span>Tax estimate</span>
                <a
                  href="#"
                  class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <span class="sr-only"
                    >Learn more about how tax is calculated</span
                  >
                  <QuestionMarkCircleIcon class="h-5 w-5" aria-hidden="true" />
                </a>
              </dt>
              <dd class="text-sm font-medium text-gray-900">
                $ {{ cart.cartTaxTotal.toFixed(2) }}
              </dd>
            </div>
            <div
              class="flex items-center justify-between border-t border-gray-200 pt-4"
            >
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">
                $ {{ cart.cartTotal.toFixed(2) }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              @click="handleCheckout"
              :disabled="cart.items.length === 0 || isProcessingCheckout"
              type="button"
              class="w-full rounded-md border border-transparent bg-[#159243] px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-[#127a38] focus:outline-none focus:ring-2 focus:ring-[#159243] focus:ring-offset-2 focus:ring-offset-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isProcessingCheckout">Processing...</span>
              <span v-else>Checkout</span>
            </button>

            <div
              v-if="checkoutError"
              class="mt-3 text-sm text-red-600 text-center"
            >
              {{ checkoutError }}
            </div>
          </div>
        </section>
      </form>
    </main>

    <footer aria-labelledby="footer-heading" class="bg-white">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-t border-gray-200 py-4">
          <div
            class="grid grid-cols-1 md:grid-flow-col md:auto-rows-min md:grid-cols-12 md:gap-x-8 md:gap-y-16"
          ></div>
        </div>

        <div class="border-t border-gray-100 py-2 text-center">
          <p class="text-sm text-gray-500">
            &copy; 2023 Caleb S. Lewis Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

    <!-- Auth modal (client-only) -->
    <ClientOnly>
      <div
        v-if="showAuthModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 class="text-lg font-medium mb-4">
            Please sign in to continue to checkout
          </h3>
          <div class="flex gap-3">
            <SignInButton
              class="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
            >
              Sign In
            </SignInButton>
            <SignUpButton
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Create account
            </SignUpButton>
          </div>
          <div class="mt-4 text-right">
            <button
              @click="showAuthModal = false"
              class="text-sm text-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon as XMarkIconOutline,
} from '@heroicons/vue/24/outline';
import {
  CheckIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon as XMarkIconMini,
} from '@heroicons/vue/20/solid';

import { useCartStore } from '../stores/cart';
const cart = useCartStore();

// Clerk UI components + composable
import { SignInButton, SignUpButton, useAuth, useUser } from '@clerk/vue';

// Reactive helpers for auth modal and checkout state
const open = ref(false);
const isProcessingCheckout = ref(false);
const checkoutError = ref('');
const showAuthModal = ref(false);

// Access Clerk auth state (client-only)
const { isLoaded, isSignedIn } = process.client
  ? useAuth()
  : { isLoaded: ref(false), isSignedIn: ref(false) };
const { user } = process.client ? useUser() : { user: ref(null) };
const userFirstName = computed(() =>
  user && user.value && user.value.firstName ? user.value.firstName : '',
);

// Initialize cart session on client side
onMounted(() => {
  cart.initializeSession();
});

// Move checkout logic into a reusable function
const proceedToCheckout = async () => {
  if (cart.items.length === 0) {
    checkoutError.value = 'Your cart is empty';
    return;
  }

  isProcessingCheckout.value = true;
  checkoutError.value = '';

  try {
    // Create checkout session
    const response = await $fetch('/api/create-checkout-session', {
      method: 'POST',
      body: {
        items: cart.items.map((item) => ({
          id: item._id,
          title: item.photo?.title || 'Photo',
          price: item.photo?.price || 0,
          quantity: item.quantity,
          imageUrl: item.photo?.imageUrl || '',
          imageSize: item.imageSize,
        })),
      },
    });

    // Redirect to Stripe checkout
    if (response.url) {
      await navigateTo(response.url, { external: true });
    } else {
      throw new Error('No checkout URL received');
    }
  } catch (error) {
    console.error('Checkout error:', error);
    checkoutError.value = 'Failed to process checkout. Please try again.';
  } finally {
    isProcessingCheckout.value = false;
  }
};

// Main handler invoked by the Checkout button
const handleCheckout = async () => {
  if (cart.items.length === 0) {
    checkoutError.value = 'Your cart is empty';
    return;
  }

  // If user is signed in, proceed
  if (process.client && isSignedIn && isSignedIn.value) {
    await proceedToCheckout();
    return;
  }

  // Otherwise show auth modal and wait for sign-in
  showAuthModal.value = true;
};

// When the user signs in (isSignedIn becomes true) and the auth modal is visible, continue to checkout
watch(isSignedIn, async (signed) => {
  if (process.client && signed && showAuthModal.value) {
    showAuthModal.value = false;
    // small delay to let Clerk finalize session
    setTimeout(() => proceedToCheckout(), 250);
  }
});

const changeCartItemQty = async (itemIdx, qty) => {
  console.log('entered changeCartItemQty method');
  console.log('itemIdx to change: ', itemIdx.toString());
  console.log('qty to change to: ', qty.toString());

  // Get the actual item from the cart using the index
  const item = cart.items[itemIdx];
  if (item && item._id) {
    await cart.updateQuantity(item._id, parseInt(qty));
    console.log('Updated quantity for item:', item._id);
  }
  console.log('Cart Items: ', cart.items);
};

const removeCartItem = async (itemIdx) => {
  console.log('entered removeCartItem method');
  console.log('itemIdx to remove: ', itemIdx.toString());

  // Get the actual item from the cart using the index
  const itemToRemove = cart.items[itemIdx];
  if (itemToRemove) {
    console.log('Removing item with ID:', itemToRemove._id);
    await cart.removeFromCart(itemToRemove._id);
  }

  console.log('Cart Items: ', cart.items);
};

const navigation = {
  categories: [
    {
      id: 'NorthCarolina',
      name: 'North Carolina',
      featured: [
        {
          name: 'NC Gallery',
          href: '/ncgallery',
          imageSrc: '/images/NCCoast.jpg',
          imageAlt: 'North Carolina Gallery - Visit our NC photo collection',
        },
      ],
      sections: [],
    },
    {
      id: 'Texas',
      name: 'Texas',
      featured: [
        {
          name: 'TX Gallery',
          href: '/txgallery',
          imageSrc: '/samplePhotos/Texas Bluebonnets.jpg',
          imageAlt: 'Texas Gallery - Visit our TX photo collection',
        },
      ],
      sections: [],
    },
  ],
  pages: [],
};

const products = [
  {
    id: 1,
    name: 'Afternoon Rainstorm',
    href: '#',
    price: '$32.00',
    color: 'Sienna',
    inStock: true,
    size: '12x18',
    imageSrc: '/samplePhotos/Afternoon rainstorm 1.jpg',
    imageAlt: 'An afternoon rainstorm near the community of Clingman, NC',
  },
  {
    id: 2,
    name: 'Historic plantation houses',
    href: '#',
    price: '$48.00',
    color: 'Black',
    inStock: false,
    leadTime: '3–4 weeks',
    size: '24x36',
    imageSrc: '/samplePhotos/Farm House 2.jpg',
    imageAlt: 'A historic plantation in eastern NC',
  },
  {
    id: 3,
    name: 'Fog in the Morning',
    href: '#',
    price: '$35.00',
    color: 'White',
    inStock: true,
    size: '12x18',
    imageSrc: '/samplePhotos/Fog in the morning.jpg',
    imageAlt: 'Fog laying low in a field with the foothills of NC',
  },
];
const relatedProducts = [
  {
    id: 1,
    name: 'Billfold Wallet',
    href: '#',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-related-product-01.jpg',
    imageAlt: 'Front of Billfold Wallet in natural leather.',
    price: '$118',
    color: 'Natural',
  },
];
const footerNavigation = {
  products: [
    { name: 'Bags', href: '#' },
    { name: 'Tees', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Sustainability', href: '#' },
  ],
  customerService: [
    { name: 'Contact', href: '#' },
    { name: 'Shipping', href: '#' },
  ],
};
</script>
