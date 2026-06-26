/**
 * FeatureCard – lightweight presentational card used outside the bento context
 * (e.g. in marketing emails, docs, or smaller grid layouts).
 *
 * For the full bento+accordion experience see BentoGrid.tsx.
 */

import { cn } from "@/lib/cn";
import { FeatureIcon } from "./FeatureIcon";

interface FeatureCardProps {
  iconKey?: string;
  /** Legacy: accept a ReactNode icon too */
  icon?: React.ReactNode;
  title: string;
  description: string;
  highlight?: boolean;
  className?: string;
}

export function FeatureCard({
  iconKey,
  icon,
  title,
  description,
  highlight = false,
  className,
}: FeatureCardProps) {
  return (
    <article
      className={cn("card card-glass card-body", highlight && "card-highlight", className)}
      aria-label={title}
    >
      <div className="icon-box icon-box-accent icon-box-lg" aria-hidden="true">
        {iconKey
          ? <FeatureIcon iconKey={iconKey} className="w-6 h-6" />
          : icon}
      </div>
      <h3 className="text-heading-md" style={{ marginTop: "var(--space-4)" }}>{title}</h3>
      <p className="text-body-sm text-secondary" style={{ marginTop: "var(--space-2)" }}>
        {description}
      </p>
    </article>
  );
}
