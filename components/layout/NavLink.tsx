/**
 * NavLink – a single navigation anchor.
 *
 * Props:
 *  - href:     string
 *  - children: React.ReactNode
 *  - isActive?: boolean   (highlight current section)
 *
 * Usage: <NavLink href="#features">Features</NavLink>
 */

import type { AnchorHTMLAttributes } from "react";

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isActive?: boolean;
}

export function NavLink({ href, isActive = false, children, ...rest }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
