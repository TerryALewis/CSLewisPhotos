<template>
  <div class="bg-white">
    <header class="relative bg-white">
      <p
        class="flex h-10 items-center justify-center bg-[#159243] px-4 text-sm font-medium text-white sm:px-6 lg:px-8"
      >
        Get free delivery on orders over $100
      </p>

      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center justify-center">
            <div class="flex">
              <NuxtLink to="/">
                <span class="sr-only">Caleb S. Lewis Photography</span>
                <span class="text-xl font-bold text-[#159243]"
                  >Caleb S. Lewis Photography</span
                >
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main
      class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div class="text-center">
        <div
          class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
        >
          <CheckIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h1
          class="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Payment Successful!
        </h1>
        <p class="mt-4 text-lg text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div v-if="sessionData" class="mt-8 p-6 bg-gray-50 rounded-lg">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
          <div class="text-left">
            <p><strong>Order ID:</strong> {{ sessionData.id }}</p>
            <p>
              <strong>Amount:</strong> ${{
                (sessionData.amount_total / 100).toFixed(2)
              }}
            </p>
            <p><strong>Status:</strong> {{ sessionData.payment_status }}</p>
            <p v-if="sessionData.customer_details?.email">
              <strong>Email:</strong> {{ sessionData.customer_details.email }}
            </p>
          </div>
        </div>

        <div class="mt-10 flex justify-center space-x-4">
          <NuxtLink
            to="/"
            class="rounded-md bg-[#159243] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#159243] focus:ring-offset-2"
          >
            Continue Shopping
          </NuxtLink>
          <button
            @click="clearCartAndRedirect"
            class="rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#159243] focus:ring-offset-2"
          >
            View Galleries
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/20/solid';
import { cartStore } from '../stores/cart';

const route = useRoute();
const cart = cartStore();

const sessionData = ref(null);
const loading = ref(true);
const error = ref(null);

// Get session ID from URL parameters
const sessionId = route.query.session_id;

onMounted(async () => {
  if (sessionId) {
    try {
      // Fetch session details from Stripe (optional - for order confirmation)
      const { data } = await $fetch('/api/get-checkout-session', {
        method: 'POST',
        body: { sessionId },
      });

      sessionData.value = data;

      // Clear the cart since payment was successful
      cart.items.splice(0);
      cart.updateCartSummary();
    } catch (err) {
      console.error('Error fetching session:', err);
      error.value = 'Unable to retrieve order details';
    }
  }
  loading.value = false;
});

const clearCartAndRedirect = () => {
  cart.items.splice(0);
  cart.updateCartSummary();
  navigateTo('/');
};
</script>
