/**
 * In-memory sliding-window rate limiter for login attempts.
 *
 * Works per server instance. On serverless platforms (Vercel) each instance
 * has its own memory, so this is a best-effort brake on brute force — it
 * slows an attacker down considerably but is not a global guarantee. The
 * README explains how to swap in a shared store (e.g. Upstash Redis) if you
 * ever need stricter protection.
 */

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 8; // per window, per key

interface Bucket {
  count: number;
  windowStartedAt: number;
}

const buckets = new Map<string, Bucket>();

/** Periodically drop expired buckets so memory stays bounded. */
function sweep(now: number): void {
  if (buckets.size < 500) return;
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStartedAt > WINDOW_MS) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds the caller should wait before retrying (when not allowed). */
  retryAfterSeconds: number;
}

/**
 * Record a failed attempt and report whether further attempts are allowed.
 * Call this once per failed login.
 */
export function registerFailedAttempt(key: string): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || now - bucket.windowStartedAt > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStartedAt: now });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  bucket.count += 1;
  if (bucket.count > MAX_ATTEMPTS) {
    const retryAfterMs = WINDOW_MS - (now - bucket.windowStartedAt);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/** Clear the bucket after a successful login so one typo doesn't linger. */
export function clearAttempts(key: string): void {
  buckets.delete(key);
}
