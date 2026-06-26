/**
 * Hero – above-the-fold section.
 *
 * Layout:   two-column on ≥ lg, stacked on mobile.
 * Left:     eyebrow badge → h1 → subheading → CTA group → social proof
 * Right:    DashboardIllustration (SVG-based dashboard mock)
 * BG:       CSS-only animated gradient mesh + floating orbs
 *
 * All entry animations complete within 500ms (longest: 450ms + delay 150ms).
 */

import { HeroBadge } from "./HeroBadge";
import { HeroCTAGroup } from "./HeroCTAGroup";
import { SocialProofStrip } from "./SocialProofStrip";
import { DashboardIllustration } from "./DashboardIllustration";
import { CTA } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="hero"
    >
      {/* ── Animated CSS background ── */}
      <div className="hero__bg" aria-hidden="true">
        {/* Animated gradient orbs */}
        <div className="hero__orb hero__orb--primary" />
        <div className="hero__orb hero__orb--secondary" />
        <div className="hero__orb hero__orb--cyan" />

        {/* Animated grid */}
        <div className="hero__grid" />

        {/* Radial vignette */}
        <div className="hero__vignette" />
      </div>

      {/* ── Content ── */}
      <div className="container hero__container">

        {/* Left: copy */}
        <div className="hero__copy">

          <HeroBadge>
            Now in Public Beta · 10,000+ workflows running
          </HeroBadge>

          <h1 id="hero-heading" className="hero__headline text-display-xl">
            Automate{" "}
            <span className="text-gradient" aria-label="Everything">
              Everything.
            </span>
            <br />
            Scale{" "}
            <span className="hero__headline-accent" aria-label="Infinitely">
              Infinitely.
            </span>
          </h1>

          <p className="hero__subheading text-body-xl text-secondary">
            The AI-native automation platform that deploys intelligent agents,
            orchestrates complex workflows, and learns from every interaction —
            so your team can focus on what humans do best.
          </p>

          <HeroCTAGroup
            primary={CTA.primary}
            secondary={CTA.secondary}
          />

          {/* Stat strip */}
          <div className="hero__stats animate-fade-in delay-400" role="list" aria-label="Platform statistics">
            <div className="hero__stat" role="listitem">
              <strong className="hero__stat-value text-gradient-accent">99.98%</strong>
              <span className="hero__stat-label text-caption">Uptime SLA</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat" role="listitem">
              <strong className="hero__stat-value text-gradient-accent">10ms</strong>
              <span className="hero__stat-label text-caption">Median Latency</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat" role="listitem">
              <strong className="hero__stat-value text-gradient-accent">500+</strong>
              <span className="hero__stat-label text-caption">Integrations</span>
            </div>
          </div>

          <SocialProofStrip />
        </div>

        {/* Right: dashboard illustration */}
        <div className="hero__visual" aria-hidden="false">
          <DashboardIllustration />
        </div>

      </div>

      {/* ── Bottom fade ── */}
      <div className="hero__bottom-fade" aria-hidden="true" />
    </section>
  );
}
