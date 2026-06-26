/**
 * metadata – helpers for generating per-page Next.js Metadata objects.
 *
 * Usage in any page:
 *   export const metadata = buildMetadata({
 *     title: "Pricing",
 *     description: "Simple, transparent pricing for every team size.",
 *   });
 */

import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./constants";

interface BuildMetadataOptions {
  title?:       string;
  description?: string;
  path?:        string; // relative path for canonical URL, e.g. "/pricing"
  ogImage?:     string;
  noIndex?:     boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  ogImage = "/og-image.png",
  noIndex = false,
}: BuildMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonical = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      images: [{ url: ogImage }],
    },
    twitter: {
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true,  follow: true  },
  };
}
