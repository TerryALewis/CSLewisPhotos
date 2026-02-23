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
                    <component
                      :is="SignInButtonComp"
                      class="text-sm font-medium text-gray-700 hover:text-gray-900"
                      >Sign In</component
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
import { ref, computed, onMounted, watch } from 'vue';
// removed static Clerk imports to avoid server bundling
// import { SignInButton } from '@clerk/vue';
// import { useAuth, useUser } from '@clerk/vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '~/stores/cart';
import { useCatalogStore } from '~/stores/catalog';

// client-side Clerk composables and components (populated onMounted)
const SignInButtonComp = ref<any>(null);
let authRef: any = null;
let userRef: any = null;
const isLoadedRef = ref(false);
const isSignedInRef = ref(false);
const userFirstNameRef = ref('');

onMounted(async () => {
  try {
    const mod = await import('@clerk/vue');
    SignInButtonComp.value = mod.SignInButton;
    authRef = mod.useAuth();
    userRef = mod.useUser();

    // initialize values
    isLoadedRef.value = !!authRef.isLoaded?.value;
    isSignedInRef.value = !!authRef.isSignedIn?.value;
    userFirstNameRef.value =
      (userRef.user?.value && userRef.user.value.firstName) || '';

    // watch for changes
    if (authRef.isLoaded)
      watch(
        () => authRef.isLoaded.value,
        (v) => (isLoadedRef.value = !!v),
      );
    if (authRef.isSignedIn)
      watch(
        () => authRef.isSignedIn.value,
        (v) => (isSignedInRef.value = !!v),
      );
    if (userRef.user)
      watch(
        () => userRef.user.value,
        (u) => (userFirstNameRef.value = (u && u.firstName) || ''),
      );
  } catch (e) {
    // Clerk not available on server or not installed; keep defaults
    // eslint-disable-next-line no-console
    console.warn('Clerk dynamic import failed in layout:', e);
  }
});

// expose values with template-safe names
const isLoaded = isLoadedRef;
const isSignedInBool = computed(() => isSignedInRef.value);
const userFirstName = computed(() => userFirstNameRef.value);

// helper to unwrap either a ref or a plain value
function unwrap(x: any) {
  if (x && typeof x === 'object' && 'value' in x) return x.value;
  return x;
}

const catalog = useCatalogStore();
const galleriesLinks = computed(() => catalog.getGalleriesLinks);
const cart = useCartStore();
const cartCount = computed(() => cart.items.length);

// local UI state
const showGalleries = ref(false);
</script>
