// Nuxt middleware for Clerk authentication
// This will run on pages that require authentication

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Guard for client-only Clerk usage
  if (!process.client) return;

  // Use Clerk Vue composable
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - dynamic import of Clerk composables
    const { useAuth } = await import('@clerk/vue');
    const { isSignedIn } = useAuth();

    // If accessing protected routes and user is not authenticated
    if (!isSignedIn.value && to.path.startsWith('/protected')) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Authentication required',
      });
    }
  } catch (e) {
    // If Clerk isn't available, allow navigation and log
    // (middleware should not block dev server if auth isn't wired)
    console.warn('Clerk composables not available in middleware:', e);
  }
});
