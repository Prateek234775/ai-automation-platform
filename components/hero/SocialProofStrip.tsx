const COMPANIES = [
  "Acme Corp",
  "Nexus AI",
  "Orbital",
  "Synthos",
  "Vertex Co",
];

export function SocialProofStrip() {
  return (
    <div className="social-proof animate-fade-in delay-500">
      <p className="social-proof__label">
        Trusted by teams at
      </p>
      <ul className="social-proof__logos" role="list" aria-label="Companies using the platform">
        {COMPANIES.map((name) => (
          <li key={name} className="social-proof__logo-item">
            {/* SVG wordmark placeholder — replace with actual logos */}
            <svg
              viewBox="0 0 80 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label={name}
              role="img"
              className="social-proof__logo-svg"
            >
              <text
                x="0"
                y="15"
                fontFamily="var(--font-heading)"
                fontSize="13"
                fontWeight="600"
                fill="currentColor"
                letterSpacing="-0.5"
              >
                {name}
              </text>
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
}
