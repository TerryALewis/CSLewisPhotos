import { defineNuxtPlugin } from '#app';
import { clerkPlugin } from '@clerk/vue';
import * as Clerk from '@clerk/vue';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  // Install Clerk Vue plugin onto the Vue app
  nuxtApp.vueApp.use(clerkPlugin, {
    publishableKey: config.public.clerkPublishableKey as string,
  });

  const clerkClient = {
    useAuth: Clerk.useAuth,
    useUser: Clerk.useUser,
    SignInButton: Clerk.SignInButton,
    SignOutButton: Clerk.SignOutButton,
    UserButton: Clerk.UserButton,
  };

  // Return provide so Nuxt registers $clerkClient once
  return {
    provide: {
      clerkClient,
    },
  };
});
