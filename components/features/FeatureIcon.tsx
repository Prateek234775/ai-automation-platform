/**
 * FeatureIcon – resolves an iconKey string to an inline SVG component.
 * All paths are hand-crafted 24×24 icons. No icon library.
 */

interface IconProps {
  className?: string;
}

function BrainIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <path d="M12 5C10.9 5 10 5.9 10 7V8C8.3 8.3 7 9.8 7 11.5C7 12.4 7.4 13.2 8 13.8V17C8 17.6 8.4 18 9 18H15C15.6 18 16 17.6 16 17V13.8C16.6 13.2 17 12.4 17 11.5C17 9.8 15.7 8.3 14 8V7C14 5.9 13.1 5 12 5Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.5 13H14.5M12 13V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="9" cy="11" r="1" fill="currentColor"/>
      <circle cx="15" cy="11" r="1" fill="currentColor"/>
      <path d="M7 11.5C5.9 11.2 5 10.2 5 9C5 7.3 6.6 6 8.5 6.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M17 11.5C18.1 11.2 19 10.2 19 9C19 7.3 17.4 6 15.5 6.5"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function WorkflowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <rect x="2"  y="3"  width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="16" y="3"  width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9"  y="10" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2"  y="16" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="16" y="16" width="6" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 8v2.5C5 11.3 5.7 12 6.5 12H9M15 12h2.5c.8 0 1.5-.7 1.5-1.5V8"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12 15v1.5M5 16v-1.5C5 13.7 5.7 13 6.5 13H9M15 13h2.5c.8 0 1.5.7 1.5 1.5V16"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ChartIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 20V8l4.5 4 4.5-6 4.5 4L21 5v15"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7.5" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="12"  cy="6"  r="1.5" fill="currentColor"/>
      <circle cx="16.5" cy="10" r="1.5" fill="currentColor"/>
    </svg>
  );
}

function GatewayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4"  cy="6"  r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="6"  r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4"  cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="20" cy="18" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 6.8L9.5 10M14.5 10L18 6.8M6 17.2L9.5 14M14.5 14L18 17.2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function PuzzleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <path d="M10 2H6C4.9 2 4 2.9 4 4v4M10 2c0 1.1-.9 2-2 2s-2-.9-2-2M10 2h4M14 2c0 1.1.9 2 2 2s2-.9 2-2M14 2h4c1.1 0 2 .9 2 2v4M20 6c-1.1 0-2 .9-2 2s.9 2 2 2M20 6v4M20 10v4M20 14c-1.1 0-2 .9-2 2s.9 2 2 2M20 14v4c0 1.1-.9 2-2 2h-4M14 22c0-1.1-.9-2-2-2s-2 .9-2 2M14 22h-4M10 22H6c-1.1 0-2-.9-2-2v-4M4 16c1.1 0 2-.9 2-2s-.9-2-2-2M4 16v-4M4 12V8M4 8c1.1 0 2-.9 2-2S5.1 4 4 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <path d="M12 3L4 6.5v5C4 15.7 7.4 19.7 12 21c4.6-1.3 8-5.3 8-9.5v-5L12 3z"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true" focusable="false" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 12h18M12 3c-2.5 2.5-4 5.6-4 9s1.5 6.5 4 9M12 3c2.5 2.5 4 5.6 4 9s-1.5 6.5-4 9"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

const ICON_MAP: Record<string, React.ComponentType<IconProps>> = {
  brain:    BrainIcon,
  workflow: WorkflowIcon,
  chart:    ChartIcon,
  gateway:  GatewayIcon,
  puzzle:   PuzzleIcon,
  shield:   ShieldIcon,
  globe:    GlobeIcon,
};

export function FeatureIcon({
  iconKey,
  className,
}: {
  iconKey: string;
  className?: string;
}) {
  const Icon = ICON_MAP[iconKey] ?? BrainIcon;
  return <Icon className={className} />;
}
