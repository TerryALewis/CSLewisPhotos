import { defineStore } from 'pinia';
import { CartItem } from '../classes/Cart';
import { useCatalogStore } from './catalog';

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[], // You can use a more complex item type
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
      }
    },
  },
});

/* if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot));
} */
