/**
 * Environment validation for the auth layer.
 *
 * Both secrets live ONLY on the server — they are never imported by client
 * components, so nothing here can end up in the browser bundle.
 */

export class AuthConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthConfigError";
  }
}

const MIN_PASSWORD_LENGTH = 8;
const MIN_SECRET_LENGTH = 32;

/**
 * Read and validate the auth environment variables.
 * Throws a descriptive error (safe to log — it never contains secret values)
 * when configuration is missing or too weak.
 */
export function getAuthEnv(): { sitePassword: string; sessionSecret: string } {
  const sitePassword = process.env.SITE_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sitePassword) {
    throw new AuthConfigError(
      "SITE_PASSWORD is not set. Copy .env.example to .env and choose a password (min " +
        `${MIN_PASSWORD_LENGTH} characters). On Vercel, add it under Settings → Environment Variables.`,
    );
  }
  if (sitePassword.length < MIN_PASSWORD_LENGTH) {
    throw new AuthConfigError(
      `SITE_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    );
  }

  if (!sessionSecret) {
    throw new AuthConfigError(
      "SESSION_SECRET is not set. Copy .env.example to .env and generate a random secret " +
        `(min ${MIN_SECRET_LENGTH} characters) — see the README for generation one-liners.`,
    );
  }
  if (sessionSecret.length < MIN_SECRET_LENGTH) {
    throw new AuthConfigError(
      `SESSION_SECRET must be at least ${MIN_SECRET_LENGTH} characters long. ` +
        "Generate one with: node -e \"console.log(require('crypto').randomBytes(48).toString('base64url'))\"",
    );
  }

  return { sitePassword, sessionSecret };
}
