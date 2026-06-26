/**
 * Pricing – server component section shell.
 * Passes plain serialisable plan data to PricingInteractive (client).
 * All prices are computed in lib/pricingMatrix.ts — nothing is hardcoded here.
 */

import { PricingInteractive } from "./PricingInteractive";
import { PRICING_PLANS }      from "@/lib/pricingPlans";

// Re-export shared types so downstream files have one import point
export type { Cycle as BillingCycle } from "@/lib/pricingMatrix";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="pricing-section gradient-section-subtle"
    >
      <div className="container">

        {/* ── Section header ── */}
        <header className="section-header">
          <div className="badge badge-eyebrow">Simple Pricing</div>

          <h2 id="pricing-heading" className="text-display-md">
            The right plan for{" "}
            <span className="text-gradient">every team</span>
          </h2>

          <p className="text-body-lg text-secondary" style={{ maxWidth: "40rem" }}>
            Start free, scale seamlessly. No hidden fees, no per-seat surprises —
            just straightforward pricing that grows with your automation needs.
          </p>
        </header>

        {/* ── Interactive pricing grid ── */}
        <PricingInteractive plans={PRICING_PLANS} />

        {/* ── Enterprise callout ── */}
        <aside
          className="pricing-enterprise-note"
          aria-label="Enterprise note"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" width="18" height="18">
            <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3v5m0 3v1"
              stroke="var(--clr-indigo-400)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-body-sm text-secondary">
            Need custom limits, on-premise deployment, or volume pricing?{" "}
            <a href="/contact" className="text-accent hover-underline">
              Talk to our sales team
            </a>
            .
          </span>
        </aside>

      </div>
    </section>
  );
}
