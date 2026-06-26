/**
 * Features – Bento grid section (server component).
 *
 * Desktop : CSS Grid bento layout with interactive active-card highlighting.
 * Mobile  : Collapses to a fully accessible accordion.
 *
 * All interactivity is isolated in BentoGrid (client component).
 * This shell stays a server component and owns the section markup + SEO.
 */

import { BentoGrid } from "./BentoGrid";
import { FEATURES } from "@/lib/features-data";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="features-section gradient-section-mid"
    >
      <div className="container">

        {/* ── Section header ── */}
        <header className="section-header">
          <div className="badge badge-eyebrow">Platform Capabilities</div>

          <h2
            id="features-heading"
            className="text-display-md"
          >
            Everything your team needs to{" "}
            <span className="text-gradient">automate at scale</span>
          </h2>

          <p className="text-body-lg text-secondary" style={{ maxWidth: "42rem" }}>
            Seven core capabilities, one unified platform. From autonomous AI agents
            to enterprise-grade security — each feature is designed to work seamlessly
            with the rest.
          </p>
        </header>

        {/* ── Bento grid / accordion ── */}
        <BentoGrid features={FEATURES} />

      </div>
    </section>
  );
}
