/**
 * pricingPlans.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Plan metadata: names, taglines, feature lists, CTAs, and visual config.
 * Contains NO prices — those come exclusively from pricingMatrix.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { TierId } from "./pricingMatrix";

export interface PricingFeature {
  text:      string;
  /** false = shown as a strikethrough / unavailable on this plan */
  included:  boolean;
  /** Optional tooltip / qualifier  */
  note?:     string;
}

export interface PricingPlan {
  id:          TierId;
  name:        string;
  tagline:     string;
  description: string;
  badge?:      string;          // e.g. "Most Popular", "Best Value"
  highlighted: boolean;         // drives the Pro card visual treatment
  ctaLabel:    string;
  ctaHref:     string;
  features:    PricingFeature[];
  /** Visual accent colour key (used for gradient border + icon tint) */
  accent:      "indigo" | "violet" | "cyan";
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id:          "starter",
    name:        "Starter",
    tagline:     "For individuals & small teams",
    description: "Everything you need to start automating your first workflows and deploy AI agents at a small scale.",
    highlighted: false,
    ctaLabel:    "Start for free",
    ctaHref:     "/signup?plan=starter",
    accent:      "indigo",
    features: [
      { text: "Up to 5 active workflows",           included: true  },
      { text: "10,000 task executions / mo",         included: true  },
      { text: "3 AI agent deployments",              included: true  },
      { text: "Community integrations (50+)",        included: true  },
      { text: "Standard support (48h SLA)",          included: true  },
      { text: "1 GB log retention",                  included: true  },
      { text: "Multi-region deployment",             included: false },
      { text: "Custom model fine-tuning",            included: false },
      { text: "SSO / SAML",                          included: false },
      { text: "Dedicated infrastructure",            included: false },
    ],
  },
  {
    id:          "pro",
    name:        "Pro",
    tagline:     "For growing teams that move fast",
    description: "Unlimited workflows, priority support, and advanced model routing for teams shipping production automation.",
    badge:       "Most Popular",
    highlighted: true,
    ctaLabel:    "Start free trial",
    ctaHref:     "/signup?plan=pro",
    accent:      "violet",
    features: [
      { text: "Unlimited active workflows",          included: true  },
      { text: "500,000 task executions / mo",        included: true  },
      { text: "25 AI agent deployments",             included: true  },
      { text: "All integrations (500+)",             included: true  },
      { text: "Priority support (4h SLA)",           included: true  },
      { text: "30 GB log retention",                 included: true  },
      { text: "Multi-region deployment",             included: true  },
      { text: "Custom model fine-tuning",            included: true  },
      { text: "SSO / SAML",                          included: false },
      { text: "Dedicated infrastructure",            included: false },
    ],
  },
  {
    id:          "enterprise",
    name:        "Enterprise",
    tagline:     "For organisations at scale",
    description: "SOC 2 certified, dedicated infrastructure, and a named customer success manager for mission-critical workloads.",
    highlighted: false,
    ctaLabel:    "Talk to sales",
    ctaHref:     "/contact?plan=enterprise",
    accent:      "cyan",
    features: [
      { text: "Unlimited active workflows",          included: true  },
      { text: "Unlimited task executions",           included: true, note: "Fair use policy applies" },
      { text: "Unlimited AI agent deployments",      included: true  },
      { text: "All integrations + private registry", included: true  },
      { text: "Dedicated support (1h SLA)",          included: true  },
      { text: "Unlimited log retention",             included: true  },
      { text: "Multi-region deployment",             included: true  },
      { text: "Custom model fine-tuning",            included: true  },
      { text: "SSO / SAML",                          included: true  },
      { text: "Dedicated infrastructure",            included: true  },
    ],
  },
];
