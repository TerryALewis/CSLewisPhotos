<template>
  <nav class="bg-transparent absolute top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center">
            <h1 :class="headerTextClass + ' text-xl font-bold'">
              C.S. Lewis Photos
            </h1>
          </NuxtLink>
        </div>

        <div class="flex items-center space-x-6">
          <div class="relative">
            <button
              type="button"
              class="inline-flex items-center px-3 py-2 text-sm font-medium hover:text-gray-200"
              @click="showGalleries = !showGalleries"
              aria-haspopup="menu"
              :aria-expanded="showGalleries"
              :class="headerTextClass"
            >
              Galleries
              <svg
                class="-mr-1 ml-2 h-4 w-4"
                :class="headerTextClass"
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

          <div>
            <ClientOnly>
              <template v-if="!isLoaded">
                <div class="h-8 w-20 bg-gray-200 rounded animate-pulse" />
              </template>

              <template v-else>
                <template v-if="isSignedInBool">
                  <NuxtLink
                    to="/account"
                    :class="
                      headerTextClass +
                      ' text-sm font-medium hover:text-gray-200'
                    "
                  >
                    Welcome{{ userFirstName ? ', ' + userFirstName : '' }}
                  </NuxtLink>
                </template>
                <template v-else>
                  <SignInButton
                    :class="
                      headerTextClass +
                      ' text-sm font-medium hover:text-gray-200'
                    "
                    >Sign In</SignInButton
                  >
                </template>
              </template>
            </ClientOnly>
          </div>

          <div>
            <NuxtLink
              to="/"
              :class="
                headerTextClass + ' text-sm font-medium hover:text-gray-200'
              "
              >Home</NuxtLink
            >
          </div>

          <div>
            <NuxtLink
              to="/cart"
              class="flex items-center text-sm font-medium hover:text-gray-200"
            >
              <ShoppingBagIcon
                class="h-5 w-5 mr-2"
                :class="headerTextClass"
                aria-hidden="true"
              />
              <span class="sr-only">Shopping cart</span>
              <span :class="headerTextClass">{{ cartCount }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SignInButton, useAuth, useUser } from '@clerk/vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/outline';
import { useCartStore } from '~/stores/cart';
import { useCatalogStore } from '~/stores/catalog';
import { useRoute } from 'vue-router';

const auth = process.client
  ? useAuth()
  : { isLoaded: ref(false), isSignedIn: ref(false) };
const userRes = process.client ? useUser() : { user: ref(null) };

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

const catalog = useCatalogStore();
const galleriesLinks = computed(() => catalog.getGalleriesLinks);
const cart = useCartStore();
const cartCount = computed(() => cart.items.length);

const showGalleries = ref(false);

const route = useRoute();

// Only mark as gallery/hero pages for exact or clearly prefixed gallery routes
const isGalleryPage = computed(() => {
  const raw = route.path || '';
  const p = raw.replace(/\/+$/, ''); // remove trailing slash
  if (p === '/') return true;
  if (p === '/ncgallery' || p === '/txgallery') return true;
  // any route under /galleries or /galleries/slug
  if (p === '/galleries' || p.startsWith('/galleries/')) return true;
  return false;
});

const headerTextClass = computed(() => (isGalleryPage.value ? 'text-[#159243]' : 'text-gray-900'));
</script>
