/**
 * features-data.ts
 * Single source of truth for all feature content.
 * Imported by the Features section (server component) and passed
 * as plain serialisable props to the client bento / accordion.
 */

export type FeatureAccentColor =
  | "indigo"
  | "violet"
  | "cyan"
  | "emerald"
  | "amber"
  | "rose";

/** Which bento grid cell size a card occupies on desktop */
export type BentoSize =
  | "wide"    // spans 2 columns
  | "tall"    // spans 2 rows
  | "normal"  // 1×1
  | "hero";   // spans 2 columns × 2 rows

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  /** Detailed body shown in expanded accordion or active bento state */
  detail: string;
  /** Icon key – resolved to a component in FeatureIcon.tsx */
  iconKey: string;
  accent: FeatureAccentColor;
  bentoSize: BentoSize;
  /** Zero-indexed grid column start (1-based CSS grid) */
  colStart?: number;
  rowStart?: number;
}

export const FEATURES: FeatureItem[] = [
  {
    id: "autonomous-agents",
    title: "Autonomous Agents",
    description:
      "Self-healing AI agents that reason, plan, and recover from failure without human intervention.",
    detail:
      "Deploy agents that observe, orient, decide, and act across any API surface. Built-in retry logic, fallback chains, and audit trails keep every run accountable.",
    iconKey: "brain",
    accent: "indigo",
    bentoSize: "hero",
    colStart: 1,
    rowStart: 1,
  },
  {
    id: "workflow-orchestration",
    title: "Workflow Orchestration",
    description:
      "Visual pipeline builder for complex multi-step automations with conditional branching.",
    detail:
      "Drag-and-drop nodes connect APIs, databases, LLM calls, and webhooks into deterministic workflows. Sub-millisecond state transitions with full observability.",
    iconKey: "workflow",
    accent: "violet",
    bentoSize: "wide",
    colStart: 3,
    rowStart: 1,
  },
  {
    id: "realtime-analytics",
    title: "Real-time Analytics",
    description:
      "Live telemetry on every workflow execution — latency, cost, throughput, and error rates.",
    detail:
      "Stream events to your dashboard as they happen. Set SLO alerts, drill into traces, and export to any observability platform via OpenTelemetry.",
    iconKey: "chart",
    accent: "cyan",
    bentoSize: "normal",
    colStart: 3,
    rowStart: 2,
  },
  {
    id: "model-gateway",
    title: "Model Gateway",
    description:
      "Route, cache, and rate-limit requests across every major LLM provider from a single endpoint.",
    detail:
      "Automatic fallbacks between OpenAI, Anthropic, Gemini, and local models. Semantic caching slashes token costs. Fine-grained per-key rate limits.",
    iconKey: "gateway",
    accent: "violet",
    bentoSize: "normal",
    colStart: 4,
    rowStart: 2,
  },
  {
    id: "500-integrations",
    title: "500+ Integrations",
    description:
      "Pre-built connectors for Slack, Salesforce, GitHub, Notion, Postgres, and hundreds more.",
    detail:
      "Every connector ships with OAuth, retry logic, and schema inference. Build custom integrations in minutes with our SDK and publish them to the marketplace.",
    iconKey: "puzzle",
    accent: "emerald",
    bentoSize: "wide",
    colStart: 1,
    rowStart: 3,
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. End-to-end encryption, RBAC, SSO, and private VPC deployments.",
    detail:
      "Every secret is encrypted at rest and in transit. Role-based access controls down to individual workflow steps. Audit logs shipped to your SIEM in real time.",
    iconKey: "shield",
    accent: "rose",
    bentoSize: "normal",
    colStart: 3,
    rowStart: 3,
  },
  {
    id: "global-edge",
    title: "Global Edge Network",
    description:
      "48 regions worldwide. Sub-10ms median latency with automatic geo-routing.",
    detail:
      "Workflows execute at the edge closest to your data source. Zero cold starts. 99.98% uptime SLA backed by a financial guarantee.",
    iconKey: "globe",
    accent: "cyan",
    bentoSize: "normal",
    colStart: 4,
    rowStart: 3,
  },
];
