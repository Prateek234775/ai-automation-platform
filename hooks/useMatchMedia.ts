"use client";

/**
 * useMatchMedia
 *
 * Tracks a CSS media query string and returns whether it currently matches.
 * Uses window.matchMedia + the 'change' event — no polling, no ResizeObserver.
 *
 * SSR-safe: returns `defaultValue` (false by default) on the server and on the
 * first client render before the effect fires, preventing a hydration mismatch.
 *
 * The listener is attached once per query string and cleaned up on unmount.
 * Changing the `query` prop tears down the old listener and creates a new one.
 *
 * @param query        CSS media query string, e.g. "(max-width: 767px)"
 * @param defaultValue Value to return before the first match evaluation (SSR).
 *                     Defaults to false.
 *
 * @example
 *   const isMobile = useMatchMedia("(max-width: 767px)");
 *   const prefersReducedMotion = useMatchMedia("(prefers-reduced-motion: reduce)");
 */

import { useEffect, useState } from "react";

export function useMatchMedia(query: string, defaultValue = false): boolean {
  // Initialise from the live MediaQueryList on the client so the first
  // paint after hydration is correct without waiting for an effect flush.
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return defaultValue;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    // Guard for environments where matchMedia is unavailable (jsdom, etc.)
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia(query);

    // Sync immediately in case the query result changed between SSR and mount
    setMatches(mql.matches);

    // Use the modern addEventListener API; fall back to addListener for
    // Safari < 14 which doesn't support addEventListener on MediaQueryList.
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (mql.addEventListener) {
      mql.addEventListener("change", handler);
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore — legacy Safari < 14 fallback
      mql.addListener(handler);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", handler);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore — legacy Safari < 14 fallback
        mql.removeListener(handler);
      }
    };
  }, [query]); // re-subscribe only when the query string changes

  return matches;
}
