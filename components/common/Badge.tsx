import { cn } from "@/lib/cn";

type BadgeVariant =
  | "accent"
  | "secondary"
  | "highlight"
  | "success"
  | "warning"
  | "error"
  | "outline"
  | "subtle"
  | "eyebrow";

interface BadgeProps {
  children:  React.ReactNode;
  variant?:  BadgeVariant;
  icon?:     React.ReactNode;
  className?: string;
}

/**
 * Badge – pill label that maps to the design system badge classes.
 *
 * @example
 *   <Badge variant="accent">New Feature</Badge>
 *   <Badge variant="eyebrow">Platform Capabilities</Badge>
 */
export function Badge({
  children,
  variant  = "accent",
  icon,
  className,
}: BadgeProps) {
  return (
    <span className={cn("badge", `badge-${variant}`, className)}>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
