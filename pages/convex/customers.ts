import { api } from '~/convex/_generated/api';

export const upsertCustomerClient = async (payload: any) => {
  const { $convex } = useNuxtApp();
  // The generated client API may not exist until Convex artifacts are generated on CI.
  // Cast to any to avoid build-time type errors; after running `npx convex build` the proper types will be available.
  return await $convex.mutation(
    (api as any).customers.upsertCustomer,
    payload as any,
  );
};
