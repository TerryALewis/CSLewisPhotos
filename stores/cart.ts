import { defineStore } from 'pinia';

export const cartStore = defineStore('cart', {
  state: () => ({
    items: [] as string[], // You can use a more complex item type
  }),
  getters: {
    cartSize: (state) => state.items.length,
  },
  actions: {
    addToCart(item: string) {
      this.items.push(item);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(cartStore, import.meta.hot));
}
