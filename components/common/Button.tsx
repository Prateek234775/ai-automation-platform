import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "highlight" | "danger";
type ButtonSize    = "sm" | "md" | "lg" | "xl";

interface BaseProps {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  children:  React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/**
 * Button – polymorphic button/anchor that maps to the design system btn classes.
 * Renders <a> when `href` is supplied, <button> otherwise.
 *
 * @example
 *   <Button variant="primary" size="lg">Get Started</Button>
 *   <Button variant="secondary" href="/docs">Read Docs</Button>
 */
export function Button({
  variant   = "primary",
  size      = "md",
  fullWidth = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && "btn-full",
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
