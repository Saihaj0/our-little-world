import { NextResponse } from "next/server";
import { getAuthEnv, AuthConfigError } from "@/lib/auth/env";
import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from "@/lib/auth/session";
import { registerFailedAttempt, clearAttempts } from "@/lib/auth/rate-limit";

export const runtime = "nodejs";

/**
 * Extract a client identifier for rate limiting.
 * We deliberately use a coarse key (IP) — no logging of passwords or IPs
 * happens anywhere in this route.
 */
function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Compare submitted password against the configured one in constant time. */
async function passwordMatches(submitted: string, expected: string): Promise<boolean> {
  const enc = new TextEncoder();
  // Hash both sides first so lengths never leak through timing.
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", enc.encode(submitted)),
    crypto.subtle.digest("SHA-256", enc.encode(expected)),
  ]);
  const va = new Uint8Array(a);
  const vb = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < va.length; i++) diff |= va[i]! ^ vb[i]!;
  return diff === 0;
}

export async function POST(request: Request): Promise<NextResponse> {
  // Validate input shape before anything else.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password =
    typeof body === "object" && body !== null && "password" in body
      ? (body as { password: unknown }).password
      : undefined;

  if (typeof password !== "string" || password.length === 0 || password.length > 512) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const key = clientKey(request);

  // Fail closed if the server is misconfigured — never fall back to
  // accepting everything (or revealing config details to the client).
  let env;
  try {
    env = getAuthEnv();
  } catch (error) {
    if (error instanceof AuthConfigError) {
      // Log the setup problem server-side; show the visitor a safe message.
      console.error(`[auth] configuration error: ${error.message}`);
    }
    return NextResponse.json(
      { error: "This little world isn't set up yet. Please try again later." },
      { status: 503 },
    );
  }

  const ok = await passwordMatches(password, env.sitePassword);

  if (!ok) {
    const verdict = registerFailedAttempt(key);
    if (!verdict.allowed) {
      return NextResponse.json(
        {
          error: "Too many attempts. Please wait a little while and try again.",
          retryAfterSeconds: verdict.retryAfterSeconds,
        },
        {
          status: 429,
          headers: { "Retry-After": String(verdict.retryAfterSeconds) },
        },
      );
    }
    // Generic message — never reveal whether the password was close.
    return NextResponse.json({ error: "That didn't work. Try again?" }, { status: 401 });
  }

  clearAttempts(key);
  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
  return response;
}
