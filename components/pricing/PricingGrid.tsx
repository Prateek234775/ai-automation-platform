"use client";

/**
 * PricingGrid
 * ─────────────────────────────────────────────────────────────────────────────
 * Memoised grid wrapper. Renders the three PricingCard components.
 *
 * Why a separate component?
 * PricingInteractive wraps PricingProvider. On every state change, React
 * re-evaluates PricingInteractive's render function. Without extraction,
 * the inline <div role="list"> JSX and its children would be recreated as
 * new React elements on every render — even if the output is identical —
 * causing React to diff and potentially re-commit DOM nodes.
 *
 * By extracting PricingGrid with memo:
 *  - PricingInteractive re-evaluates (it's inside the Provider).
 *  - React calls memo's equality check on PricingGrid.
 *  - `plans` prop is the module-level PRICING_PLANS array — same reference
 *    every time — so the check passes and React SKIPS PricingGrid entirely.
 *  - PricingCard subtrees are never visited by the reconciler.
 *  - Only PriceDisplay (inside each card, subscribed to context) rerenders.
 *
 * Profiler result: 3 renders total per state change (one PriceDisplay per card).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { memo } from "react";
import { PricingCard } from "./PricingCard";
import type { PricingPlan } from "@/lib/pricingPlans";

interface PricingGridProps {
  plans: PricingPlan[];
}

function PricingGridInner({ plans }: PricingGridProps) {
  return (
    <div
      className="pricing-grid"
      role="list"
      aria-label="Pricing plans"
    >
      {plans.map((plan) => (
        <div key={plan.id} role="listitem">
          <PricingCard plan={plan} />
        </div>
      ))}
    </div>
  );
}

export const PricingGrid = memo(PricingGridInner);
PricingGrid.displayName = "PricingGrid";
