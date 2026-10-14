import type { Metadata } from "next";
import LockScreen from "./LockScreen";

export const metadata: Metadata = {
  title: "A little place made just for us",
};

/**
 * The lock screen. The middleware lets unauthenticated visitors through to
 * THIS page only; the actual content lives at "/" and is unreachable
 * without a valid session cookie.
 */
export default function WelcomePage() {
  return <LockScreen />;
}
