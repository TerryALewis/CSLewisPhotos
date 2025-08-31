// Nuxt middleware for Clerk authentication
// This will run on pages that require authentication

export default defineNuxtRouteMiddleware((to, from) => {
  // Get the Clerk instance
  const { user } = useClerk();

  // If accessing protected routes and user is not authenticated
  if (!user.value && to.path.startsWith('/protected')) {
    // Redirect to sign-in or handle authentication
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication required',
    });
  }
});
