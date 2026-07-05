import type { CodexForgeNavigationRouteHref } from "./navigation-shell-types";

export type CodexForgePrimaryProductAreaLabel =
  | "Home / Operator Cockpit"
  | "Generate"
  | "Projects"
  | "Assets"
  | "Providers"
  | "Workflows"
  | "Trading"
  | "Audit / Runs"
  | "Settings / Safety"
  | "Developer / Checkpoints";

export type CodexForgePrimaryProductArea = {
  label: CodexForgePrimaryProductAreaLabel;
  href: CodexForgeNavigationRouteHref;
  summary: string;
};

export const CODEXFORGE_PRIMARY_PRODUCT_AREAS: readonly CodexForgePrimaryProductArea[] = [
  { label: "Home / Operator Cockpit", href: "/codexforge-cockpit", summary: "Operator cockpit for controlled AI/video/workflow/trading development." },
  { label: "Generate", href: "/ai", summary: "Action-first request and generation planning surface; no prompt is sent from this navigation model." },
  { label: "Projects", href: "/video-projects", summary: "Project workspace for briefs, plans, reviews, and readiness." },
  { label: "Assets", href: "/video-assets", summary: "Asset review and handoff workspace without upload, download, or persistence changes." },
  { label: "Providers", href: "/provider-adapters", summary: "Provider readiness, adapter contracts, and key isolation review." },
  { label: "Workflows", href: "/video-workflows", summary: "Workflow planning, readiness, approvals, and result review." },
  { label: "Trading", href: "/trading-workspace-hub-preview", summary: "Research, thesis, watchlist, risk, backtest, and paper-review surfaces." },
  { label: "Audit / Runs", href: "/evidence-audit-hub-preview", summary: "Evidence, audit, run history, redaction, and result continuity." },
  { label: "Settings / Safety", href: "/unified-settings-preferences-review", summary: "Settings, safety posture, blocked actions, and policy review." },
  { label: "Developer / Checkpoints", href: "/developer-diagnostics-hub-preview", summary: "Phase checkpoint routes remain preserved but secondary." }
] as const;

export const CODEXFORGE_PRIMARY_PRODUCT_AREA_HREFS = CODEXFORGE_PRIMARY_PRODUCT_AREAS.map((area) => area.href);

export const CODEXFORGE_PRIMARY_NAVIGATION_MARKERS = [
  "CodexForge Primary Navigation, README, and Workspace Layout Upgrade",
  "god-tier product shell consolidation",
  "primary navigation product areas",
  "Home / Operator Cockpit",
  "Generate",
  "Projects",
  "Assets",
  "Providers",
  "Workflows",
  "Trading",
  "Audit / Runs",
  "Settings / Safety",
  "Developer / Checkpoints",
  "phase checkpoint routes remain preserved",
  "phase checkpoint routes do not dominate primary navigation"
] as const;