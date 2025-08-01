import { defineStore } from 'pinia';
import { api } from '~/convex/_generated/api';
import type { Doc, Id } from '~/convex/_generated/dataModel';
import { CartItem } from '../classes/Cart';
import { useCatalogStore } from './catalog';
import { nextTick, triggerRef } from 'vue';

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

  // Reactive state
  const items = ref<CartItemWithPhoto[]>([]);
  const sessionId = ref('');

  // Computed properties for cart totals - automatically reactive
  const cartSubTotal = computed(() => {
    console.log('Computing cartSubTotal with items:', items.value.length);
    const subtotal = items.value.reduce((total, item) => {
      const itemTotal = (item.photo?.price || 0) * item.quantity;
      console.log(
        `Item ${item._id}: ${item.photo?.price} × ${item.quantity} = ${itemTotal}`
      );
      return total + itemTotal;
    }, 0);
    console.log('Computed cartSubTotal:', subtotal);
    return subtotal;
  });

  const cartShippingTotal = computed(() => {
    let shipping = 0;
    if (cartSubTotal.value >= 100) {
      shipping = 0;
    } else {
      shipping = items.value.reduce(
        (total, item) => total + 5, // Fixed $5 shipping per item
        0
      );
    }
    console.log('Computed cartShippingTotal:', shipping);
    return shipping;
  });

  const cartTaxTotal = computed(() => {
    const tax = items.value.reduce(
      (total, item) =>
        total + (item.photo?.price || 0) * item.quantity * 0.0825,
      0
    );
    console.log('Computed cartTaxTotal:', tax);
    return tax;
  });

  const cartTotal = computed(() => {
    const total =
      cartSubTotal.value + cartShippingTotal.value + cartTaxTotal.value;
    console.log('Computed cartTotal:', total);
    return total;
  });

  // Computed properties
  const cartSize = computed(() => items.value.length);

  // Actions
  const loadCart = async () => {
    if (!process.client || !$convex) {
      return;
    }

    try {
      const cartItems = await $convex.query(api.cart.getCartItems, {
        sessionId: sessionId.value,
      });

      // Ensure the items have the correct structure with photo data
      items.value = cartItems.map((item) => ({
        _id: item._id,
        sessionId: item.sessionId,
        photoId: item.photoId,
        quantity: item.quantity,
        addedAt: item.addedAt,
        photo: item.photo || null,
      }));

      console.log('Loaded cart items with photos:', items.value);
      console.log(
        'Items quantities:',
        items.value.map((item) => ({ id: item._id, qty: item.quantity }))
      );

      // Force reactivity update
      triggerRef(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  // Initialize session ID
  const initializeSession = () => {
    if (process.client) {
      sessionId.value =
        localStorage.getItem('sessionId') || crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId.value);
      loadCart();
    }
  };

  const addToCart = async (photoId: Id<'photos'>, quantity = 1) => {
    if (!process.client || !$convex) {
      return;
    }

    // Ensure session is initialized
    if (!sessionId.value) {
      sessionId.value =
        localStorage.getItem('sessionId') || crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId.value);
    }

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

  const removeFromCart = async (id: string) => {
    if (!sessionId.value) {
      console.log('No session ID available for cart removal');
      return;
    }
    try {
      console.log('Removing item from cart:', id);
      await $convex.mutation(api.cart.removeFromCart, { id: id as Id<'cart'> });
      console.log('Remove mutation completed, reloading cart...');
      await loadCart();
      await nextTick();
      console.log('Cart reloaded after removal');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (!sessionId.value) {
      console.log('No session ID available for quantity update');
      return;
    }
    try {
      console.log('Updating quantity for item:', id, 'to:', quantity);
      await $convex.mutation(api.cart.updateQuantity, {
        id: id as Id<'cart'>,
        quantity: quantity,
      });
      console.log('Mutation completed, reloading cart...');
      await loadCart();
      await nextTick();
      console.log('Cart reloaded, new totals:', {
        subtotal: cartSubTotal.value,
        total: cartTotal.value,
      });

      // Force a manual recalculation by accessing the computed properties
      console.log('Forcing computed property recalculation...');
      const _subtotal = cartSubTotal.value;
      const _total = cartTotal.value;
      console.log('Forced values:', { subtotal: _subtotal, total: _total });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!process.client || !$convex) {
      return;
    }

    // Ensure session is initialized
    if (!sessionId.value) {
      sessionId.value =
        localStorage.getItem('sessionId') || crypto.randomUUID();
      localStorage.setItem('sessionId', sessionId.value);
    }

    try {
      await $convex.mutation(api.cart.clearCart, {
        sessionId: sessionId.value,
      });
      items.value = [];
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Call initialization on client side after all functions are defined
  if (process.client) {
    initializeSession();
  }

  return {
    // State
    items,
    sessionId,
    cartSubTotal,
    cartShippingTotal,
    cartTaxTotal,
    cartTotal,

    // Getters
    cartSize,

    // Actions
    initializeSession,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCart,
  };
});
