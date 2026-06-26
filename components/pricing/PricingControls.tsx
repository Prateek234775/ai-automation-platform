"use client";

/**
 * PricingControls
 * ─────────────────────────────────────────────────────────────────────────────
 * Billing cycle toggle + currency selector.
 *
 * Optimisation contract:
 *  - Reads current cycle/currency from PricingStateContext  (rerenders when
 *    these values change — necessary to reflect the selected state visually).
 *  - Reads setter functions from PricingActionsContext       (stable references,
 *    never cause a rerender).
 *  - Wrapped in React.memo as a secondary guard. Since the context value
 *    changes on every toggle, memo alone would not be sufficient — the context
 *    subscription is the real driver.
 *
 * The inline onChange handlers use the stable setters from context directly,
 * so no useCallback is needed here (there are no props to stabilise).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { memo } from "react";
import { usePricingState, usePricingActions } from "./PricingContext";
import { CURRENCIES, ANNUAL_SAVINGS_LABEL } from "@/lib/pricingMatrix";
import type { Currency } from "@/lib/pricingMatrix";

function PricingControlsInner() {
  // State context — this component must rerender to reflect the selected cycle
  // and currency in the toggle UI. That is intentional and unavoidable.
  const { cycle, currency } = usePricingState();

  // Actions context — stable setter refs. Reading from a separate context
  // means this component does NOT get a spurious rerender from the setters
  // changing (they never do), only from the state values above.
  const { setCycle, setCurrency } = usePricingActions();

  return (
    <div className="pricing-controls" role="group" aria-label="Pricing options">

      {/* ── Billing cycle toggle ── */}
      <fieldset className="pricing-toggle" aria-label="Billing cycle">
        <legend className="sr-only">Billing cycle</legend>

        <div className="pricing-toggle__track" role="presentation">
          <label
            className={`pricing-toggle__option${cycle === "monthly" ? " pricing-toggle__option--active" : ""}`}
          >
            <input
              type="radio"
              name="billing-cycle"
              value="monthly"
              checked={cycle === "monthly"}
              onChange={() => setCycle("monthly")}
              className="sr-only"
            />
            Monthly
          </label>

          <label
            className={`pricing-toggle__option${cycle === "annual" ? " pricing-toggle__option--active" : ""}`}
          >
            <input
              type="radio"
              name="billing-cycle"
              value="annual"
              checked={cycle === "annual"}
              onChange={() => setCycle("annual")}
              className="sr-only"
            />
            Annual
            <span
              className="pricing-toggle__savings badge badge-success"
              aria-label={ANNUAL_SAVINGS_LABEL}
            >
              {ANNUAL_SAVINGS_LABEL}
            </span>
          </label>

          <div
            className={`pricing-toggle__indicator pricing-toggle__indicator--${cycle}`}
            aria-hidden="true"
          />
        </div>
      </fieldset>

      {/* ── Currency selector ── */}
      <div className="pricing-currency">
        <label htmlFor="currency-select" className="sr-only">
          Select currency
        </label>
        <select
          id="currency-select"
          className="pricing-currency__select"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          aria-label="Currency"
        >
          {CURRENCIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <span className="pricing-currency__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>

    </div>
  );
}

export const PricingControls = memo(PricingControlsInner);
PricingControls.displayName = "PricingControls";
