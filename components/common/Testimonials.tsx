/**
 * Testimonials – infinite CSS marquee section.
 *
 * Layout:
 *   - Two rows scrolling in opposite directions for depth
 *   - Row 1: left-to-right  (--marquee-direction: normal)
 *   - Row 2: right-to-left  (--marquee-direction: reverse)
 *   - Pure CSS animation — no JS, no library
 *   - Pauses on hover via animation-play-state: paused
 *   - Cards duplicated in JSX to create the seamless loop
 *
 * Accessibility:
 *   - aria-roledescription="marquee" on the moving track
 *   - aria-label on the section
 *   - prefers-reduced-motion stops all animation
 */

import { TestimonialCard } from "./TestimonialCard";
import { TESTIMONIALS } from "@/lib/testimonialsData";

// Split into two rows for the dual-direction effect
const ROW_A = TESTIMONIALS.slice(0, 5);   // first 5
const ROW_B = TESTIMONIALS.slice(3);      // last 5 (overlaps intentionally)

interface MarqueeRowProps {
  items: typeof TESTIMONIALS;
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}

function MarqueeRow({ items, reverse = false, speed = "normal" }: MarqueeRowProps) {
  // Duplicate cards to fill the loop seamlessly
  const doubled = [...items, ...items];
  const speedVar = speed === "slow" ? "52s" : speed === "fast" ? "28s" : "40s";

  return (
    <div
      className={`marquee-row${reverse ? " marquee-row--reverse" : ""}`}
      style={{ "--marquee-speed": speedVar } as React.CSSProperties}
      aria-roledescription="marquee"
      aria-label="Scrolling customer testimonials"
    >
      {/* The moving track — duplicated so the loop is seamless */}
      <ul
        className="marquee-track"
        role="list"
        aria-label="Testimonials"
      >
        {doubled.map((t, i) => (
          <li
            key={`${t.id}-${i}`}
            className="marquee-item"
            /* Items that are purely duplicate clones are hidden from AT */
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            <TestimonialCard testimonial={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="testimonials-section"
    >
      {/* Section header */}
      <div className="container">
        <header className="section-header">
          <div className="badge badge-eyebrow">Customer Stories</div>

          <h2 id="testimonials-heading" className="text-display-md">
            Trusted by teams that{" "}
            <span className="text-gradient">ship fast</span>
          </h2>

          <p className="text-body-lg text-secondary" style={{ maxWidth: "38rem" }}>
            From solo engineers to enterprise ops teams — here's what they say
            after switching to AI-native automation.
          </p>
        </header>
      </div>

      {/* Marquee — full-bleed, no container constraint */}
      <div className="testimonials-marquee" aria-label="Customer testimonials carousel">
        <MarqueeRow items={ROW_A} speed="normal" />
        <MarqueeRow items={ROW_B} reverse speed="slow" />
      </div>
    </section>
  );
}
