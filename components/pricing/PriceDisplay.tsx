"use client";

/**
 * PriceDisplay
 * ─────────────────────────────────────────────────────────────────────────────
 * The ONLY component that rerenders when cycle or currency changes.
 *
 * It subscribes to PricingStateContext and reads the price directly from the
 * pre-built pricingMatrix — zero arithmetic at render time.
 *
 * PricingCard is memoised and never passes cycle/currency as props, so it is
 * completely frozen. PriceDisplay is the sole moving part per card.
 *
 * Props:
 *   tierId  — identifies which row of the matrix to read
 *
 * Render output:
 *   ┌─────────────────────────────────┐
 *   │  $49          / mo              │  ← price-row
 *   │  Billed as $470 / year          │  ← annual-note (cycle === annual)
 *   │  Billed monthly, cancel any time│  ← monthly-note (cycle === monthly)
 *   └─────────────────────────────────┘
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { usePricingState } from "./PricingContext";
import {
  pricingMatrix,
  formatMatrixPrice,
  getAnnualTotal,
  type TierId,
} from "@/lib/pricingMatrix";

interface PriceDisplayProps {
  tierId: TierId;
}

export function PriceDisplay({ tierId }: PriceDisplayProps) {
  // The only component in the tree that reads volatile pricing state.
  const { cycle, currency } = usePricingState();

  const price       = pricingMatrix[cycle][currency][tierId];
  const formattedPrice = formatMatrixPrice(price, currency);
  const isAnnual    = cycle === "annual";
  const annualTotal = isAnnual ? getAnnualTotal(currency, tierId) : null;

  return (
    <div
      className="pricing-card__price-block"
      aria-label={`Price: ${formattedPrice} per month`}
    >
      <div className="pricing-card__price-row">
        <span className="pricing-card__price-amount text-display-md">
          {formattedPrice}
        </span>
        <span className="pricing-card__price-period text-caption">
          / mo
        </span>
      </div>

      {isAnnual && annualTotal !== null ? (
        <p className="pricing-card__annual-note text-caption">
          Billed as {formatMatrixPrice(annualTotal, currency)} / year
        </p>
      ) : (
        <p className="pricing-card__annual-note text-caption">
          Billed monthly, cancel any time
        </p>
      )}
    </div>
  );
}
