// Nuxt middleware for Clerk authentication
// This will run on pages that require authentication

// Removed server-side auth middleware in favor of client-side router guard plugin (plugins/auth.client.ts)
export default defineNuxtRouteMiddleware(() => {});
