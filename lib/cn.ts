/**
 * cn – lightweight className merger (no external deps).
 *
 * Filters falsy values and joins truthy strings with a space.
 * Drop-in replacement for clsx when no conditional object syntax is needed.
 *
 * @example
 *   cn("base-class", isActive && "active", undefined, "other") 
 *   // → "base-class active other"
 */

export function cn(...classes: (string | boolean | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
