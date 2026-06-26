/**
 * Badge – small pill label for eyebrows, tags, and status indicators.
 *
 * Props:
 *  - children:  React.ReactNode
 *  - variant?:  "accent" | "outline" | "subtle"  (default "accent")
 *  - icon?:     React.ReactNode  (optional leading icon)
 *
 * Usage:
 *  <Badge variant="accent" icon={<SparkIcon />}>New Feature</Badge>
 */

type BadgeVariant = "accent" | "outline" | "subtle";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
}

export function Badge({ children, variant = "accent", icon }: BadgeProps) {
  return (
    <span>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </span>
  );
}
