"use client";

import { useCallback, useEffect, useState } from "react";

interface UseMobileMenuReturn {
  isOpen: boolean;
  open:   () => void;
  close:  () => void;
  toggle: () => void;
}

/**
 * Manages open/close state for the mobile nav drawer.
 * Locks body scroll while open and closes on Escape key.
 */
export function useMobileMenu(): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

  const open   = useCallback(() => setIsOpen(true),        []);
  const close  = useCallback(() => setIsOpen(false),       []);
  const toggle = useCallback(() => setIsOpen((v) => !v),   []);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  return { isOpen, open, close, toggle };
}
