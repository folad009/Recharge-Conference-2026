import { ConvexProvider } from "convex/react";
import { convexClient } from "./lib/convex";
import { RegistrationAndHotel } from "./sections/RegistrationAndHotel";

export default function RegistrationRoot() {
  return (
    <ConvexProvider client={convexClient}>
      <RegistrationAndHotel />
    </ConvexProvider>
  );
}
