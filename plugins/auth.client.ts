export default defineNuxtPlugin(() => {
  const router = useRouter();

  // Client-side router guard for protected routes
  router.beforeEach(async (to) => {
    if (!to.path.startsWith('/protected')) return true;

    try {
      // Dynamic import so bundler doesn't include Clerk server packages
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { useAuth } = await import('@clerk/vue');
      const { isSignedIn } = useAuth();

      if (!isSignedIn.value) {
        // Redirect to account / sign-in page
        await router.push('/account');
        return false;
      }
    } catch (err) {
      // If Clerk isn't available, allow navigation and log
      // eslint-disable-next-line no-console
      console.warn('Auth plugin: Clerk composable not available', err);
      return true;
    }

    return true;
  });
});
