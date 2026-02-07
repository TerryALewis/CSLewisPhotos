import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const upsertCustomer = mutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query('customer')
      .withIndex('by_clerkId', (q) => q.eq('clerkId', args.clerkId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        name: args.name,
        email: args.email,
      });
      return await ctx.db.get(existing._id);
    }

    const id = await ctx.db.insert('customer', {
      name: args.name,
      email: args.email,
      clerkId: args.clerkId,
      createdAt: args.createdAt,
    });
    return await ctx.db.get(id);
  },
});
