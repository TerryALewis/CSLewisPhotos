import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  photos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.string(),
    thumbnailUrl: v.optional(v.string()),
    category: v.string(), // "NC" or "TX"
    location: v.optional(v.string()),
    price: v.number(),
    isAvailable: v.boolean(),
    tags: v.optional(v.array(v.string())),
    createdAt: v.number(),
  }).index('by_category', ['category']),

  cart: defineTable({
    sessionId: v.string(),
    photoId: v.id('photos'),
    quantity: v.number(),
    addedAt: v.number(),
  })
    .index('by_session', ['sessionId'])
    .index('by_photo', ['photoId']),

  orders: defineTable({
    sessionId: v.string(),
    items: v.array(
      v.object({
        photoId: v.id('photos'),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    totalAmount: v.number(),
    status: v.string(), // "pending", "completed", "cancelled"
    stripeSessionId: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_session', ['sessionId']),
});
