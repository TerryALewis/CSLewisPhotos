import { ConvexHttpClient } from 'convex/browser';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  if (!config.public.convexUrl) {
    console.error('CONVEX_URL environment variable is not set');
    throw new Error('Convex URL is required but not configured');
  }

  const convex = new ConvexHttpClient(config.public.convexUrl);

  return {
    provide: {
      convex,
    },
  };
});
