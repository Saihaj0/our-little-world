import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/session";

export const runtime = "nodejs";

/** Clear the session cookie. Safe to call even without a session. */
export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // expire immediately
  });
  return response;
}
