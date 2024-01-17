import { defineStore } from 'pinia';
import { CartItem } from '../classes/Cart';
import { useCatalogStore } from './catalog';

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[], // You can use a more complex item type
    cartSubTotal: 0,
    cartShippingTotal: 0,
    cartTaxTotal: 0,
    cartTotal: 0,
  }),
  getters: {
    cartSize: (state) => state.items.length,
  },
  actions: {
    addToCart(productID: number, quantity: number) {
      const catalog = useCatalogStore();
      const catalogItem = catalog.getPhotoByID(productID);
      if (catalogItem) {
        const item = new CartItem(
          catalogItem.id,
          catalogItem.title,
          catalogItem.price,
          quantity,
          catalogItem.imageUrl,
          catalogItem.title,
          catalogItem.size
        );
        this.items.push(item);
        this.updateCartSummary();
      }
    },
    removeItemFromCart(itemIndex: number) {
      console.log('cart item to remove: ', itemIndex.toString());
      this.items.splice(itemIndex, 1);
      this.updateCartSummary();
    },
    updateQuantity(itemIndex: number, quantity: number) {
      this.items[itemIndex].quantity = quantity;
      this.updateCartSummary();
    },
    updateCartSummary() {
      this.updateCartSubTotal();
      this.updateCartShippingTotal();
      this.updateCartTaxTotal();
      this.updateCartTotal();
    },
    updateCartSubTotal() {
      this.cartSubTotal = 0;
      this.items.forEach((item) => {
        this.cartSubTotal += item.price * item.quantity;
      });
    },
    updateCartShippingTotal() {
      this.cartShippingTotal = 0;
      if (this.cartSubTotal >= 100) {
        this.cartShippingTotal = 0;
      } else {
        this.items.forEach((item) => {
          this.cartShippingTotal += 5 * item.quantity;
        });
      }
    },
    updateCartTaxTotal() {
      this.cartTaxTotal = 0;
      this.items.forEach((item) => {
        this.cartTaxTotal += (item.price * item.quantity) / 10; // 10% tax (need to fix later for appropriate tax rate)
      });
    },
    updateCartTotal() {
      this.cartTotal = 0;
      this.cartTotal =
        this.cartSubTotal + this.cartShippingTotal + this.cartTaxTotal;
    },
  },
});

/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot));
} */
