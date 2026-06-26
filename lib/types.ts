/**
 * types – shared TypeScript types and interfaces used across the project.
 *
 * Import specific types where needed:
 *   import type { NavItem } from "@/lib/types";
 */

// ─── Navigation ────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href:  string;
  external?: boolean;
}

// ─── Social Links ──────────────────────────────────────────────────────────
export interface SocialLink {
  platform: "twitter" | "github" | "linkedin" | "youtube" | "discord";
  href:     string;
  label:    string; // accessible aria-label
}

// ─── CTA ───────────────────────────────────────────────────────────────────
export interface CtaConfig {
  label: string;
  href:  string;
}

// ─── SEO / Page meta ──────────────────────────────────────────────────────
export interface PageMeta {
  title:       string;
  description: string;
  canonical?:  string;
  ogImage?:    string;
  noIndex?:    boolean;
}

// ─── Generic icon prop ─────────────────────────────────────────────────────
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;
