"use client";

/**
 * BentoGrid – Features section interactive shell.
 *
 * ── Context Lock ──────────────────────────────────────────────────────────
 * A single `activeId` piece of state is shared by BOTH the desktop bento
 * grid AND the mobile accordion.  Neither view owns the state — it lives
 * here at the parent level and is never reset on resize.
 *
 * When the viewport crosses the 768 px breakpoint:
 *  • desktop → mobile : the currently active accordion item is scrolled into
 *    view smoothly so the user never loses their place.
 *  • mobile → desktop : the same activeId remains; the bento card is already
 *    highlighted with no extra work needed.
 *
 * Implementation notes
 *  - useMatchMedia (matchMedia + 'change' event) detects the breakpoint.
 *    No ResizeObserver, no polling.
 *  - A ref map (accordionRefs) holds a ref per feature id so we can call
 *    scrollIntoView without querying the DOM by selector.
 *  - The layout switch is CSS-only (display: none / display: grid).
 *    Components are never remounted — React keeps all state and DOM nodes.
 *  - `data-layout` on the root element lets CSS suppress the active-card
 *    border-rotate animation during the cross-fade window (see features.css).
 * ──────────────────────────────────────────────────────────────────────────
 */

import {
  useState,
  useId,
  useRef,
  useEffect,
  useCallback,
  type RefObject,
} from "react";
import { cn } from "@/lib/cn";
import { FeatureIcon } from "./FeatureIcon";
import { useMatchMedia } from "@/hooks/useMatchMedia";
import type { FeatureItem } from "@/lib/features-data";


/* ─────────────────────────────────────────────────────────────────────────
   ACCENT MAP
   Maps feature accent names → scoped CSS variable values.
   Components write these as inline style vars; CSS reads them.
   ───────────────────────────────────────────────────────────────────────── */

const ACCENT_VARS: Record<string, {
  icon: string;
  border: string;
  glow: string;
  bg: string;
  text: string;
}> = {
  indigo:  {
    icon:   "var(--clr-indigo-400)",
    border: "rgba(99,102,241,0.55)",
    glow:   "rgba(99,102,241,0.30)",
    bg:     "rgba(99,102,241,0.09)",
    text:   "var(--clr-indigo-300)",
  },
  violet:  {
    icon:   "var(--clr-violet-400)",
    border: "rgba(139,92,246,0.55)",
    glow:   "rgba(139,92,246,0.28)",
    bg:     "rgba(139,92,246,0.09)",
    text:   "var(--clr-violet-300)",
  },
  cyan:    {
    icon:   "var(--clr-cyan-400)",
    border: "rgba(6,182,212,0.55)",
    glow:   "rgba(6,182,212,0.25)",
    bg:     "rgba(6,182,212,0.08)",
    text:   "var(--clr-cyan-300)",
  },
  emerald: {
    icon:   "var(--clr-emerald-400)",
    border: "rgba(16,185,129,0.50)",
    glow:   "rgba(16,185,129,0.22)",
    bg:     "rgba(16,185,129,0.08)",
    text:   "var(--clr-emerald-400)",
  },
  amber:   {
    icon:   "var(--clr-amber-400)",
    border: "rgba(245,158,11,0.50)",
    glow:   "rgba(245,158,11,0.22)",
    bg:     "rgba(245,158,11,0.07)",
    text:   "var(--clr-amber-400)",
  },
  rose:    {
    icon:   "var(--clr-rose-400)",
    border: "rgba(244,63,94,0.50)",
    glow:   "rgba(244,63,94,0.22)",
    bg:     "rgba(244,63,94,0.07)",
    text:   "var(--clr-rose-400)",
  },
};

function accentStyle(accent: string): React.CSSProperties {
  const v = ACCENT_VARS[accent] ?? ACCENT_VARS.indigo;
  return {
    "--card-accent-icon":   v.icon,
    "--card-accent-border": v.border,
    "--card-accent-glow":   v.glow,
    "--card-accent-bg":     v.bg,
    "--card-accent-text":   v.text,
  } as React.CSSProperties;
}


/* ─────────────────────────────────────────────────────────────────────────
   BENTO CARD  (desktop)
   ───────────────────────────────────────────────────────────────────────── */

interface BentoCardProps {
  feature:    FeatureItem;
  isActive:   boolean;
  onActivate: () => void;
}

function BentoCard({ feature, isActive, onActivate }: BentoCardProps) {
  return (
    <article
      className={cn(
        "bento-card",
        `bento-card--${feature.bentoSize}`,
        isActive && "bento-card--active",
      )}
      style={{
        ...accentStyle(feature.accent),
        ...(feature.colStart ? { gridColumnStart: feature.colStart } : {}),
        ...(feature.rowStart ? { gridRowStart:    feature.rowStart } : {}),
      }}
      onClick={onActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onActivate();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      aria-label={`${feature.title}. ${isActive ? "Active" : "Click to learn more"}`}
    >
      <div className="bento-card__border"  aria-hidden="true" />
      <div className="bento-card__glow"    aria-hidden="true" />

      <div className="bento-card__inner">
        <div className="bento-card__icon-wrap" aria-hidden="true">
          <FeatureIcon iconKey={feature.iconKey} className="bento-card__icon" />
        </div>

        <div className="bento-card__text">
          <h3 className="bento-card__title text-heading-md">{feature.title}</h3>
          <p  className="bento-card__desc  text-body-sm">{feature.description}</p>
          <p
            className="bento-card__detail text-body-sm"
            aria-hidden={!isActive}
          >
            {feature.detail}
          </p>
        </div>

        {isActive && (
          <div className="bento-card__active-badge" aria-hidden="true">
            <span />
            Active
          </div>
        )}

        <div className="bento-card__arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </article>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   ACCORDION ITEM  (mobile)
   ───────────────────────────────────────────────────────────────────────── */

interface AccordionItemProps {
  feature:    FeatureItem;
  isOpen:     boolean;
  onToggle:   () => void;
  headingId:  string;
  panelId:    string;
  /** Ref forwarded from BentoGrid so Context Lock can scroll this into view */
  itemRef:    RefObject<HTMLDivElement | null>;
}

function AccordionItem({
  feature,
  isOpen,
  onToggle,
  headingId,
  panelId,
  itemRef,
}: AccordionItemProps) {
  return (
    <div
      ref={itemRef}
      className={cn("accordion-item", isOpen && "accordion-item--open")}
      style={accentStyle(feature.accent)}
    >
      <button
        id={headingId}
        className="accordion-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="accordion-trigger__icon-wrap" aria-hidden="true">
          <FeatureIcon iconKey={feature.iconKey} className="accordion-trigger__icon" />
        </span>

        <span className="accordion-trigger__text">
          <span className="accordion-trigger__title text-heading-sm">
            {feature.title}
          </span>
          <span className="accordion-trigger__desc text-body-sm">
            {feature.description}
          </span>
        </span>

        <span className="accordion-trigger__chevron" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className="accordion-panel"
      >
        <div className="accordion-panel__inner text-body-sm">
          {feature.detail}
        </div>
      </div>
    </div>
  );
}


/* ─────────────────────────────────────────────────────────────────────────
   BENTO GRID ROOT  (context lock lives here)
   ───────────────────────────────────────────────────────────────────────── */

/** Breakpoint must match the CSS media query in features.css exactly */
const MOBILE_QUERY = "(max-width: 767px)";

export function BentoGrid({ features }: { features: FeatureItem[] }) {
  // ── Shared active state ────────────────────────────────────────────────
  // Never reset on resize. Both views derive their "open/active" state from
  // this single value.
  const [activeId, setActiveId] = useState<string>(features[0]?.id ?? "");

  // ── Breakpoint detection ───────────────────────────────────────────────
  // useMatchMedia subscribes to matchMedia('change') — fires exactly once
  // when the viewport crosses 768 px in either direction.
  const isMobile = useMatchMedia(MOBILE_QUERY);

  // ── Accordion item refs ────────────────────────────────────────────────
  // One ref per feature, keyed by feature.id.  Created once and never
  // replaced, so they survive re-renders without triggering effects.
  const accordionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ── Stable uid for aria IDs ────────────────────────────────────────────
  const uid = useId();

  // ── Context Lock: scroll active item into view on → mobile ────────────
  //
  // We track the previous value of `isMobile` so the effect only runs on
  // the *transition* (false → true), not on every render and not on the
  // initial mount.
  const prevIsMobileRef = useRef<boolean | null>(null);

  useEffect(() => {
    const prevIsMobile = prevIsMobileRef.current;

    // Skip the very first run (prevIsMobile === null means it's mount, not
    // a real breakpoint change).
    if (prevIsMobile === null) {
      prevIsMobileRef.current = isMobile;
      return;
    }

    // Only act on the desktop → mobile transition.
    if (!prevIsMobile && isMobile) {
      // There is an active feature and it maps to an accordion item.
      const targetEl = activeId ? accordionRefs.current[activeId] : null;

      if (targetEl) {
        // Small delay lets the CSS display: flex kick in for the accordion
        // before we attempt scrollIntoView (avoids scrolling to y=0).
        const id = window.requestAnimationFrame(() => {
          targetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        return () => window.cancelAnimationFrame(id);
      }
    }

    prevIsMobileRef.current = isMobile;
  }, [isMobile, activeId]);

  // ── Toggle handler ─────────────────────────────────────────────────────
  const toggle = useCallback((id: string) => {
    setActiveId((prev) => (prev === id ? "" : id));
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    // `data-layout` is read by CSS to suppress the animated border during
    // the split-second when both views are technically in the DOM during a
    // resize cross-fade.  Not used for layout logic.
    <div data-layout={isMobile ? "mobile" : "desktop"}>

      {/* ── Desktop: Bento grid ─────────────────────────────────────── */}
      <div
        className="bento-grid"
        role="list"
        aria-label="Platform features"
        // aria-hidden while mobile so screen readers skip the hidden grid
        aria-hidden={isMobile}
      >
        {features.map((f) => (
          <div key={f.id} role="listitem">
            <BentoCard
              feature={f}
              isActive={activeId === f.id}
              onActivate={() => toggle(f.id)}
            />
          </div>
        ))}
      </div>

      {/* ── Mobile: Accordion ───────────────────────────────────────── */}
      <div
        className="features-accordion"
        role="list"
        aria-label="Platform features"
        aria-hidden={!isMobile}
      >
        {features.map((f) => (
          <div key={f.id} role="listitem">
            <AccordionItem
              feature={f}
              isOpen={activeId === f.id}
              onToggle={() => toggle(f.id)}
              headingId={`${uid}-heading-${f.id}`}
              panelId={`${uid}-panel-${f.id}`}
              itemRef={{
                // Build a stable callback-ref-style object that writes
                // into accordionRefs.current.  Using a plain object
                // (not useRef) here is fine because React calls the ref
                // callback again only when the element mounts/unmounts,
                // and these items are never remounted.
                get current() {
                  return accordionRefs.current[f.id] ?? null;
                },
                set current(el: HTMLDivElement | null) {
                  accordionRefs.current[f.id] = el;
                },
              }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}
