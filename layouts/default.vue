<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo/Brand -->
          <div class="flex items-center">
            <NuxtLink to="/" class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-gray-900">C.S. Lewis Photos</h1>
            </NuxtLink>
          </div>

          <!-- Main Navigation -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <NuxtLink
              to="/"
              class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-blue-600"
            >
              Home
            </NuxtLink>
            <NuxtLink
              to="/galleries"
              class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-blue-600"
            >
              Galleries
            </NuxtLink>
            <NuxtLink
              to="/about"
              class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-blue-600"
            >
              About
            </NuxtLink>
            <NuxtLink
              to="/cart"
              class="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
              active-class="text-blue-600"
            >
              Cart
            </NuxtLink>
          </div>

          <!-- Authentication Section -->
          <div class="flex items-center space-x-4">
            <ClientOnly>
              <template v-if="!isLoaded">
                <!-- Loading state -->
                <div class="animate-pulse">
                  <div class="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </template>

              <template v-else-if="isSignedIn">
                <!-- Signed in state -->
                <NuxtLink
                  to="/account"
                  class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Account
                </NuxtLink>
                <SignOutButton
                  class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                />
              </template>

              <template v-else>
                <!-- Signed out state -->
                <SignInButton
                  class="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  Sign In
                </SignInButton>
                <SignUpButton
                  class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm font-medium rounded-md transition-colors"
                >
                  Sign Up
                </SignUpButton>
              </template>

              <template #fallback>
                <div class="animate-pulse">
                  <div class="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </template>
            </ClientOnly>
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
import { SignInButton, SignUpButton, SignOutButton } from '@clerk/vue';
import { useAuth } from '@clerk/vue';

// Only access these on client side to prevent SSR issues
const { isLoaded, isSignedIn } = process.client
  ? useAuth()
  : { isLoaded: ref(false), isSignedIn: ref(false) };
</script>
