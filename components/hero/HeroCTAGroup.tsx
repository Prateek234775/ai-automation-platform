interface HeroCTAGroupProps {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

export function HeroCTAGroup({ primary, secondary }: HeroCTAGroupProps) {
  return (
    <div className="hero-cta-group animate-fade-in-up delay-300" role="group" aria-label="Call to action">
      <a
        href={primary.href}
        className="btn btn-primary btn-lg"
        aria-label={primary.label}
      >
        {/* Arrow icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <path d="M13 5l7 7-7 7M5 12h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {primary.label}
      </a>

      <a
        href={secondary.href}
        className="btn btn-secondary btn-lg"
        aria-label={secondary.label}
      >
        {/* Play icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="currentColor"/>
        </svg>
        {secondary.label}
      </a>
    </div>
  );
}
