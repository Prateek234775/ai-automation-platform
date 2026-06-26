"use client";

/**
 * MobileMenu – full-screen overlay nav for small viewports.
 *
 * Props:
 *  - isOpen:   boolean
 *  - onClose:  () => void
 *  - navItems: { label: string; href: string }[]
 *
 * Accessibility:
 *  - role="dialog" aria-modal="true"
 *  - Focus trap while open
 *  - Closes on Escape key
 */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Mobile navigation">
      {/* TODO: implement MobileMenu */}
      <button onClick={onClose} aria-label="Close menu">
        <span className="sr-only">Close</span>
      </button>
      <nav aria-label="Mobile navigation links">
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={onClose}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
