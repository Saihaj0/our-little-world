/**
 * Signed session tokens.
 *
 * - HMAC-SHA256 over a base64url payload, keyed with SESSION_SECRET.
 * - Uses the Web Crypto API, so the same code runs in Node.js route
 *   handlers AND the Edge runtime used by middleware/proxy.
 * - Verification is constant-time, and every token is checked for
 *   signature validity AND expiration before it is trusted.
 *
 * Token shape:  v1.<base64url(payload)>.<base64url(hmac)>
 * Cookie name:  olw_session  (HTTP-only, SameSite=Lax, Secure in prod)
 */

import { getAuthEnv } from "./env";

export const SESSION_COOKIE = "olw_session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const TOKEN_VERSION = "v1";

interface SessionPayload {
  /** Issued-at (unix seconds). */
  iat: number;
  /** Expiration (unix seconds). */
  exp: number;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded.padEnd(padded.length + ((4 - (padded.length % 4)) % 4), "="));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

/** Constant-time byte comparison — never short-circuits on the first difference. */
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  // Always iterate over the longer length so timing does not reveal the
  // length of the shorter value.
  const max = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;
  for (let i = 0; i < max; i++) {
    diff |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return diff === 0;
}

/** Create a signed session token that expires in SESSION_MAX_AGE seconds. */
export async function createSessionToken(): Promise<string> {
  const { sessionSecret } = getAuthEnv();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { iat: now, exp: now + SESSION_MAX_AGE };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const data = `${TOKEN_VERSION}.${payloadB64}`;
  const signature = await crypto.subtle.sign(
    "HMAC",
    await hmacKey(sessionSecret),
    new TextEncoder().encode(data),
  );
  return `${data}.${toBase64Url(new Uint8Array(signature))}`;
}

/**
 * Verify a session token.
 * Returns true only when the signature matches AND the token has not expired.
 * Malformed tokens return false — never throw on attacker-controlled input.
 */
export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  try {
    const { sessionSecret } = getAuthEnv();
    const parts = token.split(".");
    if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return false;
    const [, payloadB64, signatureB64] = parts;

    const expected = await crypto.subtle.sign(
      "HMAC",
      await hmacKey(sessionSecret),
      new TextEncoder().encode(`${TOKEN_VERSION}.${payloadB64}`),
    );
    if (!constantTimeEqual(fromBase64Url(signatureB64), new Uint8Array(expected))) {
      return false;
    }

    const payload = JSON.parse(
      new TextDecoder().decode(fromBase64Url(payloadB64)),
    ) as SessionPayload;
    if (typeof payload.exp !== "number") return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    // Any parse/crypto failure means "not authenticated".
    return false;
  }
}

/** Cookie options shared by set/clear so logout exactly mirrors login. */
export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
