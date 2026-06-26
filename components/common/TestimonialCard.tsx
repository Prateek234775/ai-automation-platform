/**
 * TestimonialCard – glass morphism quote tile.
 *
 * Semantic structure:
 *   <figure> — quote container
 *     <blockquote> — the quote text
 *     <figcaption> — author attribution
 *
 * Accent colour per card fed as CSS custom property via inline style
 * so the card shell never needs to know about specific colour values.
 */

import type { Testimonial } from "@/lib/testimonialsData";
import { StarRating } from "./StarRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const ACCENT_VARS: Record<string, { bg: string; border: string; text: string }> = {
  indigo:  { bg: "rgba(99,102,241,0.14)",  border: "rgba(99,102,241,0.28)",  text: "var(--clr-indigo-300)"  },
  violet:  { bg: "rgba(139,92,246,0.14)",  border: "rgba(139,92,246,0.28)",  text: "var(--clr-violet-300)"  },
  cyan:    { bg: "rgba(6,182,212,0.12)",   border: "rgba(6,182,212,0.26)",   text: "var(--clr-cyan-300)"    },
  emerald: { bg: "rgba(16,185,129,0.12)",  border: "rgba(16,185,129,0.26)",  text: "var(--clr-emerald-400)" },
  amber:   { bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.26)",  text: "var(--clr-amber-400)"   },
};

/** Extract two initials from a full name */
function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/** Quote mark SVG — purely decorative */
function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="testimonial-card__quote-icon"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 24V14.4C0 6.44 4.56 1.6 13.68 0l1.44 2.64C10.32 3.84 7.92 6.56 7.2 10.8H13.2V24H0ZM18.8 24V14.4C18.8 6.44 23.36 1.6 32.48 0l1.44 2.64C29.12 3.84 26.72 6.56 26 10.8H32V24H18.8Z"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  );
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, author, role, company, avatarUrl, rating, accent } = testimonial;
  const a = ACCENT_VARS[accent] ?? ACCENT_VARS.indigo;
  const initials = getInitials(author);

  return (
    <figure
      className="testimonial-card"
      aria-label={`Testimonial from ${author} at ${company}`}
      style={{
        "--tc-avatar-bg":     a.bg,
        "--tc-avatar-border": a.border,
        "--tc-avatar-text":   a.text,
      } as React.CSSProperties}
    >
      {/* Decorative quote mark */}
      <QuoteIcon />

      {/* Star rating */}
      <StarRating rating={rating} />

      {/* Quote body */}
      <blockquote className="testimonial-card__quote">
        <p className="testimonial-card__text">{quote}</p>
      </blockquote>

      {/* Attribution */}
      <figcaption className="testimonial-card__author">
        {avatarUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={avatarUrl}
            alt={`${author} profile photo`}
            width={44}
            height={44}
            loading="lazy"
            decoding="async"
            className="testimonial-card__avatar testimonial-card__avatar--img"
          />
        ) : (
          <div
            className="testimonial-card__avatar testimonial-card__avatar--initials"
            aria-hidden="true"
          >
            {initials}
          </div>
        )}
        <div className="testimonial-card__meta">
          <strong className="testimonial-card__name">{author}</strong>
          <span className="testimonial-card__role">
            {role}
            <span aria-hidden="true"> · </span>
            {company}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
