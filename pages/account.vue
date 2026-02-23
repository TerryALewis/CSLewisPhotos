<template>
  <div class="min-h-screen bg-gray-50">
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">
              C.S. Lewis Photos - Account Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <ClientOnly>
              <template v-if="UserButton">
                <component :is="UserButton" />
              </template>
              <template #fallback>
                <div
                  class="h-8 w-8 bg-gray-200 rounded-full animate-pulse"
                ></div>
              </template>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ClientOnly>
        <div v-if="!isLoaded" class="text-center py-12">
          <p class="text-gray-600">Loading...</p>
        </div>

        <div v-else-if="!isSignedIn" class="text-center py-12">
          <div
            class="bg-white overflow-hidden shadow rounded-lg max-w-md mx-auto"
          >
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Sign in required
              </h3>
              <p class="text-sm text-gray-500 mb-6">
                You need to be signed in to access your account dashboard.
              </p>
              <template v-if="SignInButton">
                <component
                  :is="SignInButton"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Sign In
                </component>
              </template>
              <template v-else>
                <div
                  class="h-10 w-full bg-gray-200 rounded animate-pulse"
                ></div>
              </template>
            </div>
          </div>
        </div>

        <div v-else class="space-y-6">
          <!-- Welcome Section -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h2 class="text-lg leading-6 font-medium text-gray-900 mb-2">
                Welcome back, {{ user?.fullName || user?.firstName || 'User' }}!
              </h2>
              <p class="text-sm text-gray-500">
                Manage your account and view your photo purchases.
              </p>
            </div>
          </div>

          <!-- Account Info -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Account Information
              </h3>
              <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{
                      user?.primaryEmailAddress?.emailAddress || 'Not provided'
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ user?.fullName || 'Not provided' }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">
                    Member since
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{
                      user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'Unknown'
                    }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">User ID</dt>
                  <dd class="mt-1 text-xs text-gray-900 font-mono">
                    {{ user?.id }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Purchase History Placeholder -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Purchase History
              </h3>
              <div class="text-center py-6">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0118 28a9.97 9.97 0 015.786 1.857m0 0A9.971 9.971 0 0118 32a9.971 9.971 0 01-5.786-1.857m0 0A9.971 9.971 0 0118 28a9.97 9.97 0 015.786 1.857m0 0A9.971 9.971 0 0118 32a9.971 9.971 0 01-5.786-1.857M31 20a4 4 0 11-8 0 4 4 0 018 0z"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">
                  No purchases yet
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Your photo purchases will appear here once you make them.
                </p>
                <div class="mt-6">
                  <NuxtLink
                    to="/galleries"
                    class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Browse Galleries
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <NuxtLink
                  to="/cart"
                  class="relative block w-full bg-white p-6 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div class="text-center">
                    <svg
                      class="mx-auto h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m7.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m7.5 0V8a2 2 0 00-2-2H9a2 2 0 00-2 2v5"
                      />
                    </svg>
                    <span class="mt-2 block text-sm font-medium text-gray-900"
                      >View Cart</span
                    >
                  </div>
                </NuxtLink>

                <NuxtLink
                  to="/galleries"
                  class="relative block w-full bg-white p-6 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div class="text-center">
                    <svg
                      class="mx-auto h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="mt-2 block text-sm font-medium text-gray-900"
                      >Browse Photos</span
                    >
                  </div>
                </NuxtLink>

                <button
                  class="relative block w-full bg-white p-6 border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div class="text-center">
                    <svg
                      class="mx-auto h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    <span class="mt-2 block text-sm font-medium text-gray-900"
                      >Favorites</span
                    >
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <template #fallback>
          <div class="text-center py-12">
            <p class="text-gray-600">Loading authentication...</p>
          </div>
        </template>
      </ClientOnly>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useNuxtApp } from '#app';

const isLoadedRef: any = ref(false);
let isSignedInRef: any = ref(false);
let userRef: any = ref(null);
const UserButtonComp = ref<any>(null);
const SignInButtonComp = ref<any>(null);
const SignOutButtonComp = ref<any>(null);

const nuxtApp = useNuxtApp();

if (process.client) {
  onMounted(async () => {
    try {
      const clerkClient = (nuxtApp as any).$clerkClient;
      if (clerkClient) {
        UserButtonComp.value = clerkClient.UserButton ?? null;
        SignInButtonComp.value = clerkClient.SignInButton ?? null;
        SignOutButtonComp.value = clerkClient.SignOutButton ?? null;

        const auth = clerkClient.useAuth();
        const u = clerkClient.useUser();

        if (auth?.isLoaded) {
          isLoadedRef.value = auth.isLoaded.value;
          (isLoadedRef as any) = auth.isLoaded;
        }
        if (auth?.isSignedIn) {
          isSignedInRef = auth.isSignedIn;
        }
        if (u?.user) {
          userRef = u.user;
        }
      } else {
        // Fallback to dynamic import if plugin-provided client not available
        const mod = await import('@clerk/vue');
        UserButtonComp.value = mod.UserButton ?? null;
        SignInButtonComp.value = mod.SignInButton ?? null;
        SignOutButtonComp.value = mod.SignOutButton ?? null;

        const auth = mod.useAuth();
        const u = mod.useUser();

        if (auth?.isLoaded) {
          isLoadedRef.value = auth.isLoaded.value;
          (isLoadedRef as any) = auth.isLoaded;
        }
        if (auth?.isSignedIn) {
          isSignedInRef = auth.isSignedIn;
        }
        if (u?.user) {
          userRef = u.user;
        }
      }
    } catch (err) {
      console.warn('Clerk dynamic import failed on account page:', err);
    }
  });
}

const isLoaded = isLoadedRef;
const isSignedIn = computed(() => isSignedInRef?.value ?? false);
const user = computed(() => userRef?.value ?? null);
const UserButton = UserButtonComp;
const SignInButton = SignInButtonComp;
const SignOutButton = SignOutButtonComp;
</script>
