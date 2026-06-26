/**
 * SectionWrapper – consistent horizontal padding + max-width container
 * applied to every page section.
 *
 * Props:
 *  - children:   React.ReactNode
 *  - className?: string   (additional classes merged in)
 *  - as?:        keyof JSX.IntrinsicElements  (default "section")
 *
 * Usage:
 *  <SectionWrapper className="py-24">
 *    ...section content
 *  </SectionWrapper>
 */

import type { ElementType, HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: ElementType;
  innerClassName?: string;
}

export function SectionWrapper({
  children,
  as: Tag = "section",
  className,
  innerClassName,
  ...rest
}: SectionWrapperProps) {
  return (
    <Tag className={className} {...rest}>
      <div className={innerClassName}>
        {children}
      </div>
    </Tag>
  );
}
