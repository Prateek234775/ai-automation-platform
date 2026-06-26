"use client";

/**
 * PricingInteractive
 * ─────────────────────────────────────────────────────────────────────────────
 * Boundary between the server component tree (Pricing.tsx) and the client
 * component subtree. Its only jobs are:
 *
 *   1. Wrap children in PricingProvider (which owns cycle + currency state).
 *   2. Render PricingControls and PricingGrid.
 *
 * This component itself has NO state — it delegates entirely to PricingProvider.
 * Therefore it never rerenders after mount (React bails out because its props
 * — the plans array — never change at runtime).
 *
 * Render tree after optimisation:
 * ─────────────────────────────────────────────────────────────────────────────
 *  PricingProvider          ← state owner; rerenders on toggle/select
 *    PricingControls        ← rerenders (reads volatile state for visual feedback)
 *    PricingGrid            ← SKIPS (memo, no volatile props)
 *      PricingCard ×3       ← SKIPS (memo, plan prop is stable)
 *        [card shell]       ← SKIPS (frozen in PricingCard)
 *        PriceDisplay       ← RERENDERS (sole context consumer that shows price)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { memo } from "react";
import { PricingProvider }  from "./PricingContext";
import { PricingControls }  from "./PricingControls";
import { PricingGrid }      from "./PricingGrid";
import type { PricingPlan } from "@/lib/pricingPlans";

interface PricingInteractiveProps {
  plans: PricingPlan[];
}

function PricingInteractiveInner({ plans }: PricingInteractiveProps) {
  return (
    <PricingProvider>
      <div className="pricing-interactive">
        <PricingControls />
        <PricingGrid plans={plans} />
      </div>
    </PricingProvider>
  );
}

export const PricingInteractive = memo(PricingInteractiveInner);
PricingInteractive.displayName = "PricingInteractive";
