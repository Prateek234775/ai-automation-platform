interface HeroBadgeProps {
  children: React.ReactNode;
}

export function HeroBadge({ children }: HeroBadgeProps) {
  return (
    <div className="badge badge-eyebrow animate-fade-in-down" aria-label={typeof children === "string" ? children : "Announcement"}>
      {children}
    </div>
  );
}
