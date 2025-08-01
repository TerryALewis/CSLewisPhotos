import { query, mutation } from './_generated/server';
import { v } from 'convex/values';

export const getPhotosByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('photos')
      .withIndex('by_category', (q) => q.eq('category', args.category))
      .filter((q) => q.eq(q.field('isAvailable'), true))
      .collect();
  },
});

export const getAllPhotos = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query('photos')
      .filter((q) => q.eq(q.field('isAvailable'), true))
      .collect();
  },
});

export const getPhotoById = query({
  args: { id: v.id('photos') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const createPhoto = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    category: v.string(),
    location: v.optional(v.string()),
    price: v.number(),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('photos', {
      ...args,
      isAvailable: true,
      createdAt: Date.now(),
    });
  },
});