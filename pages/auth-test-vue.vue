<template>
  <div
    class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div
        class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20"
      >
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div
              class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <h1 class="text-2xl font-bold text-center text-gray-900 mb-8">
                Clerk Authentication Test (Vue)
              </h1>

              <!-- Loading state -->
              <div v-if="!isLoaded" class="text-center">
                <p class="text-gray-600">Loading authentication...</p>
              </div>

              <!-- Show user info if signed in -->
              <div v-else-if="isSignedIn && user" class="space-y-4">
                <div class="bg-green-50 border border-green-200 rounded-md p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-green-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-green-800">
                        Successfully signed in!
                      </h3>
                    </div>
                  </div>
                </div>

                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-lg font-medium text-gray-900 mb-2">
                    User Information
                  </h3>
                  <div class="space-y-2 text-sm">
                    <p>
                      <strong>Email:</strong>
                      {{ user.primaryEmailAddress?.emailAddress }}
                    </p>
                    <p>
                      <strong>Name:</strong>
                      {{ user.fullName || 'Not provided' }}
                    </p>
                    <p><strong>User ID:</strong> {{ user.id }}</p>
                  </div>
                </div>

                <div class="flex space-x-4">
                  <SignOutButton
                    class="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Sign Out
                  </SignOutButton>
                  <UserButton />
                </div>
              </div>

              <!-- Show sign in options if not signed in -->
              <div v-else class="space-y-4">
                <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <svg
                        class="h-5 w-5 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-blue-800">
                        You are not signed in
                      </h3>
                      <div class="mt-2 text-sm text-blue-700">
                        <p>
                          Sign in to access your account and purchase photos.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex space-x-4">
                  <SignInButton
                    class="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Sign In
                  </SignInButton>
                  <SignUpButton
                    class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                  >
                    Sign Up
                  </SignUpButton>
                </div>
              </div>

              <!-- Debug info -->
              <div class="pt-6 border-t border-gray-200">
                <h3 class="text-sm font-medium text-gray-900 mb-2">
                  Debug Info
                </h3>
                <div class="text-xs text-gray-500 space-y-1">
                  <p>Is Loaded: {{ isLoaded }}</p>
                  <p>Is Signed In: {{ isSignedIn }}</p>
                  <p>
                    Publishable Key:
                    {{ config.public.clerkPublishableKey?.slice(0, 20) }}...
                  </p>
                </div>
              </div>

              <div class="pt-4">
                <NuxtLink
                  to="/"
                  class="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                >
                  ← Back to Home
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
} from '@clerk/vue';
import { useAuth, useUser } from '@clerk/vue';

const { isLoaded, isSignedIn } = useAuth();
const { user } = useUser();
const config = useRuntimeConfig();

definePageMeta({
  title: 'Clerk Auth Test (Vue)',
});
</script>
