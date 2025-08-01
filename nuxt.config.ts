// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: 3000,
    host: 'localhost',
  },
  alias: {
    '@': resolve(__dirname, './src'),
  },

  runtimeConfig: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      domain: process.env.NUXT_PUBLIC_DOMAIN,
      convexUrl: process.env.CONVEX_URL,
    },
  },
  plugins: ['~/plugins/convex.client.ts'],
  modules: [
    [
      // ...
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
    'nuxt-icons',
    'nuxt-headlessui',
  ],
  imports: {
    dirs: ['stores'],
  },
  css: ['/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
