import { ConvexError, v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server.js";
import type { Id } from "./_generated/dataModel.js";

const attendeeTypeValidator = v.union(
  v.literal("General Attendee"),
  v.literal("Ministry Leader"),
  v.literal("Worship Team"),
  v.literal("Volunteer"),
);

const childcareValidator = v.union(
  v.literal("No"),
  v.literal("Yes, 1 child"),
  v.literal("Yes, 2 children"),
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

async function insertRegistration(
  ctx: MutationCtx,
  args: {
    firstName: string;
    lastName: string;
    email: string;
    organization?: string;
    attendeeType:
      | "General Attendee"
      | "Ministry Leader"
      | "Worship Team"
      | "Volunteer";
    childcare: "No" | "Yes, 1 child" | "Yes, 2 children";
  },
): Promise<Id<"registrations">> {
  const email = normalizeEmail(args.email);
  if (!EMAIL_REGEX.test(email)) {
    throw new ConvexError({
      code: "INVALID_EMAIL",
      message: "Please provide a valid email address.",
    });
  }

  const existing = await ctx.db
    .query("registrations")
    .withIndex("by_email", (q) => q.eq("email", email))
    .unique();

  if (existing !== null) {
    throw new ConvexError({
      code: "ALREADY_REGISTERED",
      message: "That email is already registered. See you at Recharge!",
    });
  }

  return await ctx.db.insert("registrations", {
    firstName: args.firstName.trim(),
    lastName: args.lastName.trim(),
    email,
    organization: args.organization?.trim() || undefined,
    attendeeType: args.attendeeType,
    childcare: args.childcare,
    registeredAt: Date.now(),
  });
}

export const register = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    organization: v.optional(v.string()),
    attendeeType: attendeeTypeValidator,
    childcare: childcareValidator,
  },
  returns: v.id("registrations"),
  handler: insertRegistration,
});

export const count = query({
  args: {},
  returns: v.number(),
  handler: async (ctx) => {
    const all = await ctx.db.query("registrations").collect();
    return all.length;
  },
});
