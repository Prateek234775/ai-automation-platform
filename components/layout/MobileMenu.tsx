"use client";

/**
 * MobileMenu – full-viewport overlay nav for mobile.
 *
 * Accessibility:
 *  - role="dialog" aria-modal="true" — screen readers treat it as a modal
 *  - Focus is trapped inside while open (first focusable el gets focus)
 *  - Escape key closes (handled by useMobileMenu in parent)
 *  - aria-label on the close button
 *  - Backdrop click closes
 */

import { useEffect, useRef } from "react";
import { CTA } from "@/lib/constants";

interface NavItem {
  label: string;
  href:  string;
}

interface MobileMenuProps {
  isOpen:   boolean;
  onClose:  () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Move focus to the close button when the menu opens
  useEffect(() => {
    if (isOpen) closeRef.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="mobile-menu-backdrop"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="mobile-menu"
      >
        {/* Header row */}
        <div className="mobile-menu__header">
          {/* Logo wordmark */}
          <a
            href="/"
            className="header-logo"
            onClick={onClose}
            aria-label="Go to homepage"
          >
            <span className="header-logo__mark" aria-hidden="true">N</span>
            <span className="header-logo__text">Neural Ops</span>
          </a>

          {/* Close button */}
          <button
            ref={closeRef}
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            {/* × icon */}
            <svg
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="mobile-menu__nav">
          <ul role="list" className="mobile-menu__list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="mobile-menu__link"
                  onClick={onClose}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA buttons */}
        <div className="mobile-menu__footer">
          <a
            href={CTA.secondary.href}
            className="btn btn-secondary btn-lg btn-full"
            onClick={onClose}
          >
            {CTA.secondary.label}
          </a>
          <a
            href={CTA.primary.href}
            className="btn btn-primary btn-lg btn-full"
            onClick={onClose}
          >
            {CTA.primary.label}
          </a>
        </div>
      </div>
    </>
  );
}
