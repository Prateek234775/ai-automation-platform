import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Compiler optimisations ──────────────────────────────────────────────
  // Remove console.* calls in production (reduces JS payload, no data leaks)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  // ── Image optimisation ──────────────────────────────────────────────────
  images: {
    // Use modern formats — Next.js serves AVIF then WebP automatically
    formats: ["image/avif", "image/webp"],
    // No remote images needed for this project (all assets are local)
    remotePatterns: [],
    // Disable the blur placeholder for SVGs (they're already tiny)
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ── Headers: performance + security ────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME sniffing (XSS mitigation)
          { key: "X-Content-Type-Options",   value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options",          value: "DENY" },
          // Enable browser XSS filter
          { key: "X-XSS-Protection",         value: "1; mode=block" },
          // Don't leak referrer to third parties
          { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused browser features
          {
            key:   "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Long-cache for all static assets (fonts, images, JS chunks)
      {
        source: "/static/(.*)",
        headers: [
          {
            key:   "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key:   "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // ── Experimental ────────────────────────────────────────────────────────
  experimental: {
    // Inline critical CSS into the HTML <head> — eliminates render-blocking
    // stylesheet requests for above-the-fold content.
    inlineCss: true,
    // Optimise package imports so only used exports are bundled
    optimizePackageImports: ["next/font"],
  },
};

export default nextConfig;
