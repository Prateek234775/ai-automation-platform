"use client";

/**
 * PricingCard
 * ─────────────────────────────────────────────────────────────────────────────
 * Wrapped in React.memo — the card shell NEVER rerenders when cycle or
 * currency change. Only PriceDisplay (inside the card) subscribes to those
 * values via PricingContext and rerenders in isolation.
 *
 * Props deliberately contain NO cycle / currency / price values.
 * The only prop is `plan` — static plan metadata that never changes at runtime.
 *
 * Profiler behaviour:
 *   Toggle monthly ↔ annual  →  PricingCard: 0 renders
 *   Change USD → INR          →  PricingCard: 0 renders
 *   PriceDisplay per card      →  1 render each (3 total across all cards)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { memo } from "react";
import type { PricingPlan } from "@/lib/pricingPlans";
import { PriceDisplay } from "./PriceDisplay";
import { cn } from "@/lib/cn";

// ─── Accent map (module-level constant — never recreated) ────────────────────

const ACCENT = {
  indigo: {
    iconBg:      "rgba(99,102,241,0.12)",
    iconBorder:  "rgba(99,102,241,0.30)",
    iconColor:   "var(--clr-indigo-400)",
    badgeBg:     "rgba(99,102,241,0.12)",
    badgeBorder: "rgba(99,102,241,0.30)",
    badgeColor:  "var(--clr-indigo-300)",
    glow:        "rgba(99,102,241,0.25)",
    border:      "rgba(99,102,241,0.45)",
    gradient:    "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.08) 100%)",
  },
  violet: {
    iconBg:      "rgba(139,92,246,0.12)",
    iconBorder:  "rgba(139,92,246,0.30)",
    iconColor:   "var(--clr-violet-400)",
    badgeBg:     "rgba(139,92,246,0.12)",
    badgeBorder: "rgba(139,92,246,0.30)",
    badgeColor:  "var(--clr-violet-300)",
    glow:        "rgba(139,92,246,0.28)",
    border:      "rgba(139,92,246,0.50)",
    gradient:    "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.12) 50%, rgba(6,182,212,0.06) 100%)",
  },
  cyan: {
    iconBg:      "rgba(6,182,212,0.10)",
    iconBorder:  "rgba(6,182,212,0.25)",
    iconColor:   "var(--clr-cyan-400)",
    badgeBg:     "rgba(6,182,212,0.10)",
    badgeBorder: "rgba(6,182,212,0.25)",
    badgeColor:  "var(--clr-cyan-300)",
    glow:        "rgba(6,182,212,0.22)",
    border:      "rgba(6,182,212,0.38)",
    gradient:    "linear-gradient(135deg, rgba(6,182,212,0.10) 0%, rgba(99,102,241,0.08) 100%)",
  },
} as const;

// ─── Icon-only sub-components (module-level — never recreated) ──────────────

// Defined outside PricingCard so they have stable references and JSX bailout
// can skip them unconditionally.

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="pricing-feature__icon pricing-feature__icon--check"
      aria-hidden="true" focusable="false">
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor"
        strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="pricing-feature__icon pricing-feature__icon--cross"
      aria-hidden="true" focusable="false">
      <path d="M5 5l6 6M11 5l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function StarterGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      width="20" height="20" aria-hidden="true">
      <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function ProGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      width="20" height="20" aria-hidden="true">
      <path d="M10 2l2.09 4.26L17 7.27l-3.5 3.41.83 4.82L10 13.27l-4.33 2.23.83-4.82L3 7.27l4.91-.71L10 2z"
        fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M10 5l1.4 2.84L14.5 8.5l-2.32 2.27.55 3.23L10 12.5l-2.73 1.5.55-3.23L5.5 8.5l3.1-.66L10 5z"
        fill="currentColor"/>
    </svg>
  );
}

function EnterpriseGlyph() {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      width="20" height="20" aria-hidden="true">
      <rect x="2"  y="2"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="2"  width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2"  y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5"
        fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

// ─── Card static shell ────────────────────────────────────────────────────────

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCardInner({ plan }: PricingCardProps) {
  const a = ACCENT[plan.accent];

  return (
    <article
      className={cn("pricing-card", plan.highlighted && "pricing-card--highlighted")}
      aria-label={`${plan.name} plan`}
      style={{
        "--pc-glow":        a.glow,
        "--pc-border":      a.border,
        "--pc-gradient":    a.gradient,
        "--pc-icon-bg":     a.iconBg,
        "--pc-icon-border": a.iconBorder,
        "--pc-icon-color":  a.iconColor,
      } as React.CSSProperties}
    >
      {/* Gradient border ring */}
      <div className="pricing-card__ring" aria-hidden="true" />

      {/* Popular badge — static, part of plan metadata */}
      {plan.badge && (
        <div
          className="pricing-card__badge"
          role="img"
          aria-label={plan.badge}
          style={{
            background:  a.badgeBg,
            borderColor: a.badgeBorder,
            color:       a.badgeColor,
          }}
        >
          <span className="pricing-card__badge-dot" aria-hidden="true" />
          {plan.badge}
        </div>
      )}

      {/* ── Header: icon + name + tagline ── */}
      <header className="pricing-card__header">
        <div
          className="pricing-card__icon"
          aria-hidden="true"
          style={{
            background:  a.iconBg,
            borderColor: a.iconBorder,
            color:       a.iconColor,
          }}
        >
          {plan.id === "starter"    && <StarterGlyph />}
          {plan.id === "pro"        && <ProGlyph />}
          {plan.id === "enterprise" && <EnterpriseGlyph />}
        </div>
        <div>
          <h3 className="pricing-card__name text-heading-lg">{plan.name}</h3>
          <p  className="pricing-card__tagline text-body-sm">{plan.tagline}</p>
        </div>
      </header>

      {/* ── Price display — the ONLY part that rerenders ── */}
      <PriceDisplay tierId={plan.id} />

      {/* ── Description ── */}
      <p className="pricing-card__description text-body-sm">
        {plan.description}
      </p>

      {/* ── CTA ── */}
      <a
        href={plan.ctaHref}
        className={cn(
          "pricing-card__cta btn btn-lg btn-full",
          plan.highlighted ? "btn-primary" : "btn-secondary",
        )}
        aria-label={`${plan.ctaLabel} – ${plan.name} plan`}
      >
        {plan.ctaLabel}
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false"
          style={{ width: "1rem", height: "1rem", flexShrink: 0 }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* ── Divider ── */}
      <hr className="pricing-card__divider divider" aria-hidden="true" />

      {/* ── Feature list ── */}
      <ul
        className="pricing-card__features"
        role="list"
        aria-label={`${plan.name} plan features`}
      >
        {plan.features.map((feat) => (
          <li
            key={feat.text}
            className={cn("pricing-feature", !feat.included && "pricing-feature--excluded")}
            aria-label={`${feat.included ? "Included" : "Not included"}: ${feat.text}${feat.note ? ` (${feat.note})` : ""}`}
          >
            {feat.included ? <CheckIcon /> : <CrossIcon />}
            <span className="pricing-feature__text">
              {feat.text}
              {feat.note && (
                <span className="pricing-feature__note" aria-hidden="true">
                  {feat.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * PricingCard — memoised.
 *
 * The memo comparison uses React's default shallow-equality check.
 * Because `plan` is an element of the module-level PRICING_PLANS array
 * (a stable reference), and no other props exist, this component will
 * NEVER rerender after mount unless the plans array itself changes.
 *
 * Profiler display name is set explicitly so it appears as "PricingCard"
 * rather than the minified inner function name in DevTools.
 */
export const PricingCard = memo(PricingCardInner);
PricingCard.displayName = "PricingCard";
