/**
 * StarRating – filled SVG stars with accessible label.
 * Uses inline SVG paths so the colour is controlled by CSS (currentColor).
 */

interface StarRatingProps {
  rating: number;
  max?:   number;
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="star-icon"
    >
      <path
        d="M8 1.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L8 9.385 4.91 11.01l.59-3.44L3 5.132l3.455-.503L8 1.5z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div
      className="star-rating"
      role="img"
      aria-label={`${rating} out of ${max} stars`}
    >
      <span className="sr-only">{rating} out of {max} stars</span>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
}
