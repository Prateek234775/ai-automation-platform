/**
 * testimonialsData.ts
 * All testimonial content in one place — no hardcoded strings in components.
 * Avatar initials are generated from the author name when no image is provided.
 */

export interface Testimonial {
  id:        string;
  quote:     string;
  author:    string;
  role:      string;
  company:   string;
  /** Optional remote image. If absent, initials avatar is rendered. */
  avatarUrl?: string;
  rating:    1 | 2 | 3 | 4 | 5;
  /** Accent colour for the avatar background */
  accent:    "indigo" | "violet" | "cyan" | "emerald" | "amber";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id:      "t1",
    quote:   "We cut our ops team's manual workload by 80% in six weeks. The autonomous agents just handle it — no babysitting required.",
    author:  "Sarah Chen",
    role:    "Head of Operations",
    company: "Nexus AI",
    rating:  5,
    accent:  "indigo",
  },
  {
    id:      "t2",
    quote:   "The model gateway alone paid for the Pro plan in the first month. Our LLM costs dropped 40% overnight thanks to semantic caching.",
    author:  "Marcus Webb",
    role:    "CTO",
    company: "Orbital Systems",
    rating:  5,
    accent:  "violet",
  },
  {
    id:      "t3",
    quote:   "Migrated from three separate tools to this platform. The 500+ integrations meant zero custom glue code. Shipped in a weekend.",
    author:  "Priya Nair",
    role:    "Staff Engineer",
    company: "Synthos",
    rating:  5,
    accent:  "cyan",
  },
  {
    id:      "t4",
    quote:   "SOC 2 compliance was a blocker for us. The Enterprise plan's audit logs and RBAC gave our security team exactly what they needed.",
    author:  "David Okafor",
    role:    "VP Engineering",
    company: "Vertex Co",
    rating:  5,
    accent:  "emerald",
  },
  {
    id:      "t5",
    quote:   "Real-time analytics on every pipeline run changed how we debug. We spot bottlenecks before customers ever notice them.",
    author:  "Lena Müller",
    role:    "Platform Lead",
    company: "Acme Corp",
    rating:  5,
    accent:  "amber",
  },
  {
    id:      "t6",
    quote:   "Global edge deployment means our workflows run in the region closest to our data. The latency improvement was immediate and measurable.",
    author:  "James Okoye",
    role:    "Infrastructure Architect",
    company: "CloudForge",
    rating:  5,
    accent:  "indigo",
  },
  {
    id:      "t7",
    quote:   "The visual pipeline builder is genuinely fun to use. Non-engineers on our team built their first automation in under an hour.",
    author:  "Amara Diallo",
    role:    "Product Manager",
    company: "Luminary Labs",
    rating:  5,
    accent:  "violet",
  },
  {
    id:      "t8",
    quote:   "Support response time is legitimately 4 hours. I've never had an enterprise vendor actually honour their SLA like this before.",
    author:  "Tom Ridley",
    role:    "Director of Engineering",
    company: "PeakScale",
    rating:  5,
    accent:  "cyan",
  },
];
