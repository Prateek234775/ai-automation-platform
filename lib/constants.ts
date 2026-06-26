/**
 * constants – site-wide shared constants.
 *
 * Keep all magic strings and config values here so they're easy to update.
 */

export const SITE_NAME = "AI Automation Platform";
export const SITE_URL  = "https://your-domain.com";
export const SITE_TAGLINE = "Automate Everything. Scale Infinitely.";

export const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Docs",     href: "/docs"     },
] as const;

export const SECTION_IDS = ["hero", "features", "pricing", "testimonials"] as const;

export const SOCIAL_LINKS = {
  twitter:  "https://twitter.com/yourtwitterhandle",
  github:   "https://github.com/yourorg",
  linkedin: "https://linkedin.com/company/yourcompany",
} as const;

export const CTA = {
  primary:   { label: "Get Started Free", href: "/signup" },
  secondary: { label: "See a Demo",       href: "/demo"   },
} as const;
