import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth/session";

/**
 * Server-side protection for every route.
 *
 * Any request without a valid, signed, unexpired session cookie is turned
 * away before the page (or its data) is ever rendered:
 *   - HTML navigations  → redirect to /welcome (the lock screen)
 *   - API / data routes → 401 JSON
 *
 * This runs in the Edge runtime, which is why lib/auth/session.ts uses the
 * Web Crypto API instead of node:crypto.
 */

const LOCK_PATH = "/welcome";

/** The login endpoint must be reachable without a session (it IS the gate). */
const PUBLIC_PATHS = new Set(["/api/auth/login"]);

export async function middleware(request: NextRequest) {
  if (PUBLIC_PATHS.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const valid = await verifySessionToken(token);

  if (valid) {
    // Already unlocked — but never let an authenticated browser sit on the
    // lock screen; send them home instead.
    if (request.nextUrl.pathname === LOCK_PATH) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === LOCK_PATH) {
    return NextResponse.next();
  }

  // Unauthenticated: API routes get 401, everything else goes to the lock.
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const redirectUrl = new URL(LOCK_PATH, request.url);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Guard everything except Next.js internals and static files.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp3|mp4|woff2?)$).*)"],
};
