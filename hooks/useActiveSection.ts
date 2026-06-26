"use client";

/**
 * useActiveSection – tracks which page section is currently in the viewport
 * using IntersectionObserver.
 *
 * @param sectionIds  Array of element IDs to observe (e.g. ["hero", "features"])
 * @param options     IntersectionObserver options (rootMargin, threshold)
 * @returns The ID of the section currently most visible in the viewport.
 */

import { useEffect, useState } from "react";

interface UseActiveSectionOptions {
  rootMargin?: string;
  threshold?: number;
}

export function useActiveSection(
  sectionIds: string[],
  { rootMargin = "-40% 0px -55% 0px", threshold = 0 }: UseActiveSectionOptions = {}
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin, threshold }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds, rootMargin, threshold]);

  return activeId;
}
