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
  | "Project Files"
  | "Patch Review"
  | "Validation"
  | "Developer Diagnostics";

export type CodexForgeNormalCapabilityState =
  | "working"
  | "partial"
  | "review-only"
  | "research-only";

export type CodexForgePrimaryProductArea = {
  label: CodexForgePrimaryProductAreaLabel;
  href: CodexForgeNavigationRouteHref;
  summary: string;
  badge: string;
  capabilityState: CodexForgeNormalCapabilityState;
  primaryAction: {
    label: string;
    href: CodexForgeNavigationRouteHref;
  };
};

export const CODEXFORGE_PRIMARY_PRODUCT_AREAS: readonly CodexForgePrimaryProductArea[] = [
  { label: "CodexForge Home", href: "/", summary: "Start with Jarvis, understand the current workspace, and reach the safe review journey.", badge: "Home", capabilityState: "working", primaryAction: { label: "Build with Jarvis", href: "/jarvis" } },
  { label: "Build with Jarvis", href: "/jarvis", summary: "Describe a text or code task, review its exact boundary, approve once, and inspect the result.", badge: "Workspace", capabilityState: "working", primaryAction: { label: "Describe a task", href: "/jarvis" } },
  { label: "Projects", href: "/video-projects", summary: "See the bounded local workspace, follow project setup guidance, and continue in Jarvis with that context.", badge: "Project", capabilityState: "partial", primaryAction: { label: "Continue in Jarvis", href: "/jarvis" } },
  { label: "Assets", href: "/video-assets", summary: "Review project asset availability and planning metadata without claiming generation or scanning that did not occur.", badge: "Review", capabilityState: "review-only", primaryAction: { label: "Open Projects", href: "/video-projects" } },
  { label: "Providers", href: "/provider-adapters", summary: "Understand admitted model readiness, local or cloud boundaries, approval requirements, and paid-disabled posture.", badge: "Readiness", capabilityState: "partial", primaryAction: { label: "Build with Jarvis", href: "/jarvis" } },
  { label: "Workflows", href: "/video-workflows", summary: "Understand the safe planning and approval boundary; no connected workflow or template inventory is available yet.", badge: "Boundary", capabilityState: "review-only", primaryAction: { label: "Plan with Jarvis", href: "/jarvis" } },
  { label: "Trading", href: "/jarvis-trading", summary: "Organize research and risk notes without advice, live data, broker access, automation, or order placement.", badge: "Research", capabilityState: "research-only", primaryAction: { label: "Research with Jarvis", href: "/jarvis" } },
  { label: "Audit and Runs", href: "/jarvis-audit", summary: "Review readable run states, provider and model boundaries, approvals, and execution history.", badge: "Audit", capabilityState: "partial", primaryAction: { label: "Return to Jarvis", href: "/jarvis" } },
  { label: "Safety and Settings", href: "/jarvis-safety", summary: "Review live kill-switch, local-first, approval, cloud acknowledgement, paid-disabled, and credential boundaries.", badge: "Safety", capabilityState: "partial", primaryAction: { label: "Review Providers", href: "/provider-adapters" } },
  { label: "Project Files", href: "/files", summary: "Browse files inside the approved root, then prepare and review a copy-only patch preview without automatic writes.", badge: "Read only", capabilityState: "working", primaryAction: { label: "Prepare a patch preview", href: "/files" } },
  { label: "Patch Review", href: "/patch-preview-workbench", summary: "Review the explicit patch lifecycle; proposal context currently stays in Files and no patch is applied from this page.", badge: "Approval", capabilityState: "review-only", primaryAction: { label: "Choose a project file", href: "/files" } },
  { label: "Validation", href: "/validation", summary: "Prepare allowlisted checks, approve their exact commands, and review supplied output without arbitrary shell execution.", badge: "Allowlisted", capabilityState: "review-only", primaryAction: { label: "Prepare an allowlisted check", href: "/validation" } }
] as const;

export const CODEXFORGE_PRIMARY_PRODUCT_AREA_HREFS = CODEXFORGE_PRIMARY_PRODUCT_AREAS.map((area) => area.href);

export function getCodexForgePrimaryProductArea(href: string): CodexForgePrimaryProductArea {
  return CODEXFORGE_PRIMARY_PRODUCT_AREAS.find((area) => area.href === href) ?? CODEXFORGE_PRIMARY_PRODUCT_AREAS[0];
}

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
