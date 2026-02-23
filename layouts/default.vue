<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">C.S. Lewis Photos</h1>
            </NuxtLink>
          </div>

          <!-- Right-aligned horizontal menu -->
          <div class="flex items-center space-x-6">
            <!-- Galleries dropdown -->
            <div class="relative">
              <button
                type="button"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 hover:text-gray-700"
                @click="showGalleries = !showGalleries"
                aria-haspopup="menu"
                :aria-expanded="showGalleries"
              >
                Galleries
                <svg
                  class="-mr-1 ml-2 h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <ul
                v-if="showGalleries"
                class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20"
              >
                <li v-for="g in galleriesLinks" :key="g.id">
                  <NuxtLink
                    :to="g.href"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    @click="showGalleries = false"
                  >
                    {{ g.title }}
                  </NuxtLink>
                </li>
              </ul>
            </div>

            <!-- Sign In / Welcome -->
            <div>
              <ClientOnly>
                <template v-if="!isLoaded">
                  <div class="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                </template>

                <template v-else>
                  <template v-if="isSignedInBool">
                    <NuxtLink
                      to="/account"
                      class="text-sm font-medium text-gray-700 hover:text-gray-900"
                    >
                      Welcome{{ userFirstName ? ', ' + userFirstName : '' }}
                    </NuxtLink>
                  </template>
                  <template v-else>
                    <SignInButton
                      class="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >Sign In</SignInButton
                    >
                  </template>
                </template>
              </ClientOnly>
            </div>

            <!-- Home -->
            <div>
              <NuxtLink
                to="/"
                class="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Home
              </NuxtLink>
            </div>

            <!-- Cart with icon and count -->
            <div>
              <NuxtLink
                to="/cart"
                class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <ShoppingBagIcon
                  class="h-5 w-5 mr-2 text-gray-600"
                  aria-hidden="true"
                />
                <span class="sr-only">Shopping cart</span>
                <span>{{ cartCount }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <p class="text-sm text-gray-500">
            © {{ new Date().getFullYear() }} C.S. Lewis Photos. All rights
            reserved.
          </p>
          <div class="flex space-x-6">
            <NuxtLink
              to="/about"
              class="text-sm text-gray-500 hover:text-gray-900"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/purchasing"
              class="text-sm text-gray-500 hover:text-gray-900"
            >
              Purchase Info
            </NuxtLink>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SignInButton } from '@clerk/vue';
import { useAuth, useUser } from '@clerk/vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '~/stores/cart';
import { useCatalogStore } from '~/stores/catalog';

// client-side Clerk composables
const auth = process.client
  ? useAuth()
  : { isLoaded: ref(false), isSignedIn: ref(false) };
const userRes = process.client ? useUser() : { user: ref(null) };

// helper to unwrap either a ref or a plain value
function unwrap(x: any) {
  if (x && typeof x === 'object' && 'value' in x) return x.value;
  return x;
}

const isLoaded = computed(() => !!unwrap(auth.isLoaded));
const isSignedInBool = computed(() => !!unwrap(auth.isSignedIn));
const userFirstName = computed(() => {
  const u = unwrap(userRes.user);
  return u && u.firstName ? u.firstName : '';
});

// Galleries and cart
const catalog = useCatalogStore();
const galleriesLinks = computed(() => catalog.getGalleriesLinks);
const cart = useCartStore();
const cartCount = computed(() => cart.items.length);

// local UI state
const showGalleries = ref(false);
</script>
