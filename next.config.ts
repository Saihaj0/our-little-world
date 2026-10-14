import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 * The site is served over HTTPS in production; HSTS tells browsers to
 * enforce HTTPS from now on.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // 'unsafe-inline' for styles is required by Next.js + framer-motion inline styles.
      // Dev-only 'unsafe-eval': Next.js dev mode's React Refresh runtime evals
      // code; without it the client bundle crashes at boot (the lock screen
      // stays invisible). Production stays strict — eval is not needed there.
      `script-src 'self' 'unsafe-inline'${
        process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""
      }`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data: (inline SVG placeholders) + blob (lightbox).
      "img-src 'self' data: blob:",
      // The songs section opens Spotify/YouTube; no embeds are loaded, so
      // media/connect stay 'self'. Loosen if you add official embeds.
      "media-src 'self' blob:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // This folder lives inside a larger directory that contains other
  // lockfiles; pin the trace root to this project so builds are stable.
  outputFileTracingRoot: process.cwd(),
  images: {
    // Bundled placeholder art is SVG; replace with real photos (jpg/webp)
    // and this stays harmless thanks to the CSP sandbox below.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
