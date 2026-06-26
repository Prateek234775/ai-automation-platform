/**
 * Button – base interactive element used across all sections.
 *
 * Variants:
 *  - "primary"   → solid accent background (default)
 *  - "secondary" → outlined / ghost
 *  - "ghost"     → no border, text-only
 *
 * Sizes:
 *  - "sm" | "md" (default) | "lg"
 *
 * Props extend native <button> attributes, so it accepts:
 *  onClick, disabled, type, aria-*, etc.
 *
 * Can render as <a> when `href` is supplied (polymorphic).
 *
 * Usage:
 *  <Button variant="primary" size="lg">Get Started Free</Button>
 *  <Button variant="secondary" href="/docs">Read Docs</Button>
 */

import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize    = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?:    ButtonSize;
  children: React.ReactNode;
  className?: string;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...rest
}: ButtonProps) {
  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
