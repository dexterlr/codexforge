import type {
  MainPagesGodTierUxLink,
  MainPagesGodTierUxMetric,
  MainPagesGodTierUxPipelineStep,
} from "./main-pages-god-tier-ux-types";

export const MAIN_PAGES_GOD_TIER_UX_MARKERS = [
  "Main Pages God Tier UX Upgrade",
  "premium command center",
  "operator-grade navigation",
  "guarded video pipeline",
  "Jarvis-ready cockpit",
  "review-only UX upgrade",
  "no live provider calls",
  "no model calls",
  "no network egress",
  "no command execution from the app",
  "no browser storage writes",
] as const;

export const MAIN_PAGES_REVIEW_ONLY_BOUNDARIES = [
  "Provider calls remain blocked",
  "Model calls remain blocked",
  "Prompt sending remains blocked from this UX layer",
  "Network egress remains blocked from this UX layer",
  "Command execution remains blocked from this UX layer",
  "Browser storage writes remain blocked from this UX layer",
] as const;

export const MAIN_PAGES_HOME_LINKS: readonly MainPagesGodTierUxLink[] = [
  {
    href: "/start",
    label: "Start",
    detail: "Choose a guided safe workflow",
    state: "ready",
  },
  {
    href: "/assist",
    label: "Assist",
    detail: "Plan coding work with review gates",
    state: "review",
  },
  {
    href: "/ai-router",
    label: "Router",
    detail: "Preview model routing policy",
    state: "review",
  },
  {
    href: "/codexforge-cockpit",
    label: "Cockpit",
    detail: "Open the integrated command surface",
    state: "review",
  },
] as const;

export const MAIN_PAGES_START_LINKS: readonly MainPagesGodTierUxLink[] = [
  {
    href: "/first-task",
    label: "First safe task",
    detail: "One small change with approval boundaries",
    state: "ready",
  },
  {
    href: "/assist",
    label: "Assisted coding",
    detail: "Plan and review before execution",
    state: "review",
  },
  {
    href: "/onboarding",
    label: "Onboarding",
    detail: "Learn the product rhythm",
    state: "ready",
  },
] as const;

export const MAIN_PAGES_REVIEW_LINKS: readonly MainPagesGodTierUxLink[] = [
  {
    href: "/review-inbox",
    label: "Review inbox",
    detail: "Inspect pending result decisions",
    state: "review",
  },
  {
    href: "/run-history",
    label: "Run history",
    detail: "Trace prior workflow records",
    state: "review",
  },
  {
    href: "/workflow-results",
    label: "Workflow results",
    detail: "Capture handoff context without persistence",
    state: "review",
  },
] as const;

export const MAIN_PAGES_PROVIDER_LINKS: readonly MainPagesGodTierUxLink[] = [
  {
    href: "/ai-router",
    label: "AI router",
    detail: "Preview deterministic route selection",
    state: "review",
  },
  {
    href: "/ai-providers",
    label: "Provider registry",
    detail: "Profile-only provider account map",
    state: "review",
  },
  {
    href: "/provider-selection-policy-preview",
    label: "Provider policy",
    detail: "Phase 2043 preview remains preserved",
    state: "review",
  },
] as const;

export const GUARDED_VIDEO_PIPELINE_STEPS: readonly MainPagesGodTierUxPipelineStep[] = [
  {
    id: "provider-gateway",
    label: "Provider gateway",
    detail: "Review-only request boundary",
    state: "blocked",
  },
  {
    id: "asset-storage",
    label: "Asset storage",
    detail: "Backend-owned intake and rights",
    state: "planned",
  },
  {
    id: "audio-storage",
    label: "Audio storage",
    detail: "Consent and transcript storage blocked",
    state: "planned",
  },
  {
    id: "render-queue",
    label: "Render queue",
    detail: "Queue creation blocked",
    state: "blocked",
  },
  {
    id: "worker-orchestration",
    label: "Worker orchestration",
    detail: "Dispatch and process spawn blocked",
    state: "blocked",
  },
  {
    id: "artifact-export",
    label: "Artifact export",
    detail: "Export and download blocked",
    state: "blocked",
  },
  {
    id: "publish-gateway",
    label: "Publish gateway",
    detail: "Publish and schedule blocked",
    state: "blocked",
  },
  {
    id: "controlled-video-dry-run",
    label: "Controlled video dry run",
    detail: "Not live; operator review only",
    state: "review",
  },
] as const;

export const MAIN_PAGES_DEFAULT_METRICS: readonly MainPagesGodTierUxMetric[] = [
  {
    label: "UX layer",
    value: "Review-only",
    detail: "No live execution added",
    state: "review",
  },
  {
    label: "Provider calls",
    value: "Blocked",
    detail: "No live provider calls",
    state: "blocked",
  },
  {
    label: "Model calls",
    value: "Blocked",
    detail: "No model calls",
    state: "blocked",
  },
  {
    label: "Network",
    value: "Blocked",
    detail: "No network egress",
    state: "blocked",
  },
] as const;
