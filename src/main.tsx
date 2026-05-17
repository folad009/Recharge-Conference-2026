import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.tsx";
import "./index.css";

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;

if (!convexUrl) {
  // eslint-disable-next-line no-console
  console.warn(
    "[Recharge] VITE_CONVEX_URL is not set. Registration backend is disabled — " +
      "the form will simulate success but no data will be persisted. " +
      "Run `npx convex dev` to provision a deployment and enable it.",
  );
}

// Use a placeholder URL when not configured. We never actually subscribe to
// queries or call mutations in that mode (see hasConvex checks in App.tsx),
// so no network connection is attempted.
const convex = new ConvexReactClient(
  convexUrl ?? "https://placeholder.convex.cloud",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <App />
    </ConvexProvider>
  </StrictMode>,
);
