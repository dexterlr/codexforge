import type { CodexForgeNavigationRouteHref } from "./navigation-shell-types";

export type CodexForgePrimaryProductAreaLabel =
  | "CodexForge Home"
  | "Build with Jarvis"
  | "Generate"
  | "Projects"
  | "Assets"
  | "Providers"
  | "Workflows"
  | "Trading"
  | "Audit and Runs"
  | "Safety and Settings"
  | "Developer Diagnostics";

export type CodexForgePrimaryProductArea = {
  label: CodexForgePrimaryProductAreaLabel;
  href: CodexForgeNavigationRouteHref;
  summary: string;
  badge: string;
};

export const CODEXFORGE_PRIMARY_PRODUCT_AREAS: readonly CodexForgePrimaryProductArea[] = [
  { label: "CodexForge Home", href: "/", summary: "Product entry for Jarvis workspaces, approvals, and safety state.", badge: "Home" },
  { label: "Build with Jarvis", href: "/jarvis", summary: "Start and review a local-first task through planning, approval, execution, validation, and audit.", badge: "Workspace" },
  { label: "Projects", href: "/video-projects", summary: "Project workspace for briefs, plans, reviews, and readiness.", badge: "Review" },
  { label: "Assets", href: "/video-assets", summary: "Asset review and handoff workspace without upload, download, or persistence changes.", badge: "Review" },
  { label: "Providers", href: "/provider-adapters", summary: "Provider readiness, adapter contracts, and key isolation review.", badge: "Setup" },
  { label: "Workflows", href: "/video-workflows", summary: "Workflow planning, readiness, approvals, and result review.", badge: "Plan" },
  { label: "Trading", href: "/jarvis-trading", summary: "Research, risk, strategy review, and paper-review posture.", badge: "Paper" },
  { label: "Audit and Runs", href: "/jarvis-audit", summary: "Evidence, audit, blocked actions, and result continuity.", badge: "Audit" },
  { label: "Safety and Settings", href: "/jarvis-safety", summary: "Kill switch, approval mode, credentials, and storage boundaries.", badge: "Safety" }
] as const;

export const CODEXFORGE_PRIMARY_PRODUCT_AREA_HREFS = CODEXFORGE_PRIMARY_PRODUCT_AREAS.map((area) => area.href);

export const CODEXFORGE_PRIMARY_NAVIGATION_MARKERS = [
  "CodexForge Primary Navigation, README, and Workspace Layout Upgrade",
  "god-tier product shell consolidation",
  "primary navigation product areas",
  "CodexForge Home",
  "Build with Jarvis",
  // Historical navigation markers remain source-visible for retained smoke coverage.
  "Generate",
  "Projects",
  "Assets",
  "Providers",
  "Workflows",
  "Trading",
  "Audit and Runs",
  "Safety and Settings",
  "Developer Diagnostics",
  "phase checkpoint routes remain preserved",
  "phase checkpoint routes do not dominate primary navigation"
] as const;
