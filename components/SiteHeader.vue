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

        <div class="hidden md:flex items-center space-x-6">
          <div class="relative">
            <button
              type="button"
              :class="
                headerTextClass +
                ' inline-flex items-center px-3 py-2 text-sm font-medium hover:text-gray-200'
              "
              @click="showGalleries = !showGalleries"
              aria-haspopup="menu"
              :aria-expanded="showGalleries"
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
                  <!-- Account dropdown -->
                  <div class="relative">
                    <button
                      @click="showAccountMenu = !showAccountMenu"
                      :class="
                        headerTextClass +
                        ' text-sm font-medium inline-flex items-center'
                      "
                    >
                      Welcome{{ userFirstName ? ', ' + userFirstName : '' }}
                      <svg
                        class="ml-2 h-4 w-4"
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
                      v-if="showAccountMenu"
                      class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-30"
                    >
                      <li>
                        <NuxtLink
                          to="/account"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          @click="showAccountMenu = false"
                          >Account</NuxtLink
                        >
                      </li>
                      <li>
                        <div
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <SignOutButton class="w-full text-left"
                            >Sign out</SignOutButton
                          >
                        </div>
                      </li>
                    </ul>
                  </div>
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

        <!-- Mobile hamburger (visible on small screens) -->
        <div class="flex items-center md:hidden">
          <button
            @click="showMobileMenu = !showMobileMenu"
            class="p-2 rounded-md focus:outline-none"
            :aria-expanded="showMobileMenu"
            aria-label="Open menu"
          >
            <Bars3Icon class="h-6 w-6" :class="headerTextClass" />
          </button>
        </div>

        <!-- Mobile menu dropdown panel (shorter, more transparent) -->
        <div v-if="showMobileMenu" class="fixed inset-0 z-40 md:hidden">
          <!-- translucent backdrop -->
          <div
            class="absolute inset-0 bg-black bg-opacity-20"
            @click="showMobileMenu = false"
          ></div>
          <!-- panel anchored under header at top-right -->
          <div
            class="absolute top-16 right-4 w-72 bg-white/70 backdrop-blur-sm rounded-lg shadow-xl p-4 max-h-[60vh] overflow-auto"
          >
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold">Menu</h2>
              <button @click="showMobileMenu = false" class="text-gray-600">
                Close
              </button>
            </div>
            <nav class="mt-4 flex flex-col space-y-2">
              <button
                @click="showGalleries = !showGalleries"
                class="text-left font-medium"
              >
                Galleries
              </button>
              <ul v-if="showGalleries" class="pl-4">
                <li v-for="g in galleriesLinks" :key="g.id">
                  <NuxtLink
                    :to="g.href"
                    class="block py-2 text-sm text-gray-700"
                    @click="showMobileMenu = false"
                    >{{ g.title }}</NuxtLink
                  >
                </li>
              </ul>

              <ClientOnly>
                <template v-if="isSignedInBool">
                  <!-- Mobile: Welcome acts as toggle for account actions -->
                  <button
                    @click="showMobileAccount = !showMobileAccount"
                    class="text-left font-medium"
                  >
                    Welcome{{ userFirstName ? ', ' + userFirstName : '' }}
                  </button>
                  <ul v-if="showMobileAccount" class="pl-4">
                    <li>
                      <NuxtLink
                        to="/account"
                        class="block py-2 text-sm text-gray-700"
                        @click="showMobileMenu = false"
                        >Account</NuxtLink
                      >
                    </li>
                    <li>
                      <div class="py-2">
                        <SignOutButton class="w-full text-left"
                          >Sign out</SignOutButton
                        >
                      </div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <SignInButton class="block w-full text-left py-2"
                    >Sign In</SignInButton
                  >
                </template>
              </ClientOnly>

              <NuxtLink
                to="/"
                class="block py-2 text-sm text-gray-700"
                @click="showMobileMenu = false"
                >Home</NuxtLink
              >
              <NuxtLink
                to="/cart"
                class="block py-2 text-sm text-gray-700"
                @click="showMobileMenu = false"
                >Cart ({{ cartCount }})</NuxtLink
              >
            </nav>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { SignInButton, useAuth, useUser, SignOutButton } from '@clerk/vue';
import { ShoppingBagIcon, Bars3Icon } from '@heroicons/vue/24/outline';
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
const showAccountMenu = ref(false);
const showMobileMenu = ref(false);
const showMobileAccount = ref(false);

// dynamic text color: dark on cart page, white elsewhere
const route = useRoute();
const headerTextClass = computed(() => {
  const p = route.path;
  if (p === '/cart') return 'text-gray-900';
  if (p === '/ncgallery' || p === '/txgallery') return 'text-[#59243]';
  return 'text-white';
});
</script>
