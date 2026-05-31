import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    organization: v.optional(v.string()),
    attendeeType: v.union(
      v.literal("General Attendee"),
      v.literal("Ministry Leader"),
      v.literal("Worship Team"),
      v.literal("Volunteer"),
    ),
    department: v.optional(v.string()),
    childcare: v.union(v.literal("No"), v.literal("Yes")),
    registeredAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_registered_at", ["registeredAt"]),
});
