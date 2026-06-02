import { ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

if (!convexUrl && import.meta.env.PROD) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Recharge] VITE_CONVEX_URL is not set. Registration will not persist.",
  );
}

export const convexClient = new ConvexReactClient(
  convexUrl ?? "https://placeholder.convex.cloud",
);

export const hasConvexBackend = Boolean(convexUrl);
