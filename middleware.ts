// No-op route middleware: Clerk is handled client-side via plugins and client-only components.
// Leaving a no-op middleware here prevents Nuxt from bundling server-only Clerk modules into an Edge "middleware" function.

export default defineNuxtRouteMiddleware((to, from) => {
  // Intentionally empty. Use client-side auth guards where needed.
});
