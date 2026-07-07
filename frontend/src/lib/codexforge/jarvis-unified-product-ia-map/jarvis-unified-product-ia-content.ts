import type { Route } from "next";
import type {
  JarvisUnifiedProductPrimarySurfaceId,
  JarvisUnifiedProductWorkspaceId,
} from "./jarvis-unified-product-ia-workspaces";
import {
  getJarvisUnifiedProductWorkspaceCard,
  JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARDS,
} from "./jarvis-unified-product-ia-workspaces";

export type { JarvisUnifiedProductPrimarySurfaceId } from "./jarvis-unified-product-ia-workspaces";

export type JarvisUnifiedProductStatusTone =
  | "ready"
  | "approval-required"
  | "blocked"
  | "secondary";

export type JarvisUnifiedProductSurfaceSection =
  | "hero"
  | "workspace-grid"
  | "capability-grid"
  | "next-actions"
  | "current-focus"
  | "workspace-shell"
  | "approval-readiness"
  | "blocked-actions"
  | "audit-preview"
  | "safety"
  | "diagnostics";

export type JarvisUnifiedProductSurfaceRecord = Readonly<{
  id: JarvisUnifiedProductPrimarySurfaceId;
  routeHref: Route;
  label: string;
  title: string;
  eyebrow: string;
  badge: string;
  summary: string;
  summaryMarkers: readonly string[];
  workspaceOrder: readonly JarvisUnifiedProductWorkspaceId[];
  nextActionIds: readonly string[];
  sectionOrder: readonly JarvisUnifiedProductSurfaceSection[];
  currentFocus: string;
  heroMetrics: readonly Readonly<{
    label: string;
    value: string;
    detail: string;
  }>[];
}>;

export type JarvisUnifiedProductNextActionRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  routeHref: Route;
  tone: JarvisUnifiedProductStatusTone;
  backendRequired: string;
}>;

export type JarvisUnifiedProductCapabilityRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  tone: JarvisUnifiedProductStatusTone;
  routeHref: Route;
}>;

export type JarvisUnifiedProductSummaryRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  tone: JarvisUnifiedProductStatusTone;
}>;

export type JarvisUnifiedProductBlockedActionRecord = Readonly<{
  id: string;
  label: string;
  summary: string;
  items: readonly string[];
}>;

export type JarvisUnifiedProductDiagnosticsGroup = Readonly<{
  id: string;
  label: string;
  summary: string;
  links: readonly Readonly<{
    label: string;
    href: Route;
  }>[];
}>;

export const JARVIS_UNIFIED_PRODUCT_HOME_ORDER = [
  "jarvis-video",
  "jarvis-trading",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
  "developer-diagnostics",
] as const satisfies readonly JarvisUnifiedProductWorkspaceId[];

export const JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER = [
  "jarvis-video",
  "jarvis-trading",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
  "developer-diagnostics",
] as const satisfies readonly JarvisUnifiedProductWorkspaceId[];

export const JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER = [
  "jarvis-video",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-trading",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
  "developer-diagnostics",
] as const satisfies readonly JarvisUnifiedProductWorkspaceId[];

export const JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER = [
  "/",
  "/codexforge-cockpit",
  "/jarvis",
  "/jarvis-video",
  "/jarvis-trading",
  "/jarvis-websites",
  "/jarvis-avatar",
  "/jarvis-workflows",
  "/jarvis-audit",
  "/jarvis-safety",
  "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
] as const satisfies readonly Route[];

export type JarvisUnifiedProductPrimaryNavigationHref =
  (typeof JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER)[number];

export const JARVIS_UNIFIED_PRODUCT_NEXT_ACTION_RAIL = [
  {
    id: "open-cockpit",
    label: "Start in CodexForge Cockpit",
    summary:
      "Use the premium cockpit as the first normal user stop for current focus, approvals, readiness, and where to go next.",
    routeHref: "/codexforge-cockpit",
    tone: "ready",
    backendRequired:
      "No backend execution required. This is a product shell review surface only.",
  },
  {
    id: "review-command-center",
    label: "Review Jarvis Command Center",
    summary:
      "Confirm the world-class Jarvis product order, capability layout, permission summary, audit preview, and safety state.",
    routeHref: "/jarvis",
    tone: "ready",
    backendRequired:
      "Backend router, audit, and approval systems remain reference-only.",
  },
  {
    id: "advance-video-trial",
    label: "Advance Video Studio toward the next trial",
    summary:
      "Video studio remains primary active workspace. Review the controlled trial console, confirm dry-run and approval references, and keep execution blocked before the backend trial runner contract batch.",
    routeHref: "/jarvis-video",
    tone: "approval-required",
    backendRequired:
      "A dedicated backend-owned Jarvis video trial runner contract, start service, audit persistence path, credential isolation runtime, lock and idempotency store, and result handoff service remain backend requirements.",
  },
  {
    id: "review-trading-safety",
    label: "Review Trading Desk posture",
    summary:
      "Confirm paper-review-only scope, risk governor language, and blocked live market, broker, and order paths.",
    routeHref: "/jarvis-trading",
    tone: "approval-required",
    backendRequired:
      "Research, simulation, and audit services would be required later. No trading backend exists here.",
  },
  {
    id: "audit-before-execution",
    label: "Check Audit and Safety before any execution batch",
    summary:
      "Use Audit and Runs plus Safety and Settings to verify evidence, approval mode, and blocked action posture.",
    routeHref: "/jarvis-audit",
    tone: "ready",
    backendRequired:
      "Persistent audit and permission enforcement remain backend-only future work.",
  },
  {
    id: "open-diagnostics-second",
    label: "Open developer diagnostics second",
    summary:
      "Developer diagnostics are secondary. Phase pages remain diagnostics only and should not lead the normal product journey.",
    routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
    tone: "secondary",
    backendRequired:
      "Diagnostics do not enable execution and do not require backend creation.",
  },
] as const satisfies readonly JarvisUnifiedProductNextActionRecord[];

export const JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID = [
  {
    id: "video-review",
    label: "Video planning and review",
    summary:
      "Mission brief, storyboard, approval packet, backend readiness, and result placeholder stay visible in one premium studio.",
    tone: "ready",
    routeHref: "/jarvis-video",
  },
  {
    id: "website-flow",
    label: "Website builder flow",
    summary:
      "Idea, sitemap, design system, pages, preview, and publish approval are framed as a polished placeholder.",
    tone: "blocked",
    routeHref: "/jarvis-websites",
  },
  {
    id: "avatar-identity",
    label: "Avatar identity planning",
    summary:
      "Persona, consent, voice and visual style, safety, preview, and approval remain structured and blocked.",
    tone: "blocked",
    routeHref: "/jarvis-avatar",
  },
  {
    id: "trading-paper-review",
    label: "Trading paper review",
    summary:
      "Risk governor, strategy review, and paper ledger stay visible with concise no-advice and no-execution language.",
    tone: "approval-required",
    routeHref: "/jarvis-trading",
  },
  {
    id: "workflow-planning",
    label: "Workflow planning",
    summary:
      "Trigger, plan, permission, dry run, approval, and audit stay visible with scheduling and dispatch blocked.",
    tone: "blocked",
    routeHref: "/jarvis-workflows",
  },
  {
    id: "audit-ledger",
    label: "Audit, evidence, and result review",
    summary:
      "Run timeline, approvals ledger, blocked action log, result ledger, and evidence packets stay visible in one review workspace.",
    tone: "ready",
    routeHref: "/jarvis-audit",
  },
  {
    id: "safety-control-plane",
    label: "Safety control plane",
    summary:
      "Kill switch, permission tiers, approval mode, credential boundary, and browser storage boundary stay easy to scan.",
    tone: "ready",
    routeHref: "/jarvis-safety",
  },
  {
    id: "diagnostics-secondary",
    label: "Developer diagnostics",
    summary:
      "Phase pages remain reachable but clearly secondary to the normal product path.",
    tone: "secondary",
    routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
  },
] as const satisfies readonly JarvisUnifiedProductCapabilityRecord[];

export const JARVIS_UNIFIED_PRODUCT_APPROVAL_SUMMARY = [
  {
    id: "global-approval",
    label: "Global approval mode",
    summary: "Operator approval required stays visible above specialist details.",
    tone: "approval-required",
  },
  {
    id: "video-approval",
    label: "Video studio",
    summary:
      "Approval packet review stays active while controlled execution remains blocked.",
    tone: "approval-required",
  },
  {
    id: "trading-approval",
    label: "Trading desk",
    summary:
      "Explicit operator approval required with no financial advice, no personalised recommendations, and no buy sell instructions.",
    tone: "approval-required",
  },
  {
    id: "workflow-approval",
    label: "Workflow shell",
    summary:
      "Permission and approval lanes stay visible even though dry run and automation are blocked.",
    tone: "approval-required",
  },
  {
    id: "diagnostics-secondary",
    label: "Developer diagnostics",
    summary:
      "Developer diagnostics remain secondary and phase pages remain diagnostics only.",
    tone: "secondary",
  },
] as const satisfies readonly JarvisUnifiedProductSummaryRecord[];

export const JARVIS_UNIFIED_PRODUCT_READINESS_SUMMARY = [
  {
    id: "product-order",
    label: "Product order",
    summary:
      "home product order upgraded, premium CodexForge cockpit order upgraded, and Jarvis command center order upgraded.",
    tone: "ready",
  },
  {
    id: "video-readiness",
    label: "Video trial readiness",
    summary:
      "Video studio stays premium and visible while the locked controlled trial console shows backend-owned trial prerequisites as review-only markers.",
    tone: "approval-required",
  },
  {
    id: "workspace-shells",
    label: "Specialist workspace shells",
    summary:
      "Trading, websites, avatar, workflows, audit, and safety now read as intentional product surfaces instead of diagnostic walls.",
    tone: "ready",
  },
  {
    id: "execution-block",
    label: "Execution block",
    summary:
      "No direct frontend execution, no provider execution, no tool execution, and no network execution remain hard platform rules.",
    tone: "blocked",
  },
  {
    id: "next-batch",
    label: "Next likely batch",
    summary:
      "next likely batch: 3978-4009 - First Jarvis-Controlled Video Backend Trial Runner Contract",
    tone: "ready",
  },
] as const satisfies readonly JarvisUnifiedProductSummaryRecord[];

export const JARVIS_UNIFIED_PRODUCT_BLOCKED_ACTION_SUMMARIES = [
  {
    id: "creative-blocks",
    label: "Creative execution remains blocked",
    summary:
      "Video, website, and avatar shells show the future flow without pretending live generation or publishing exists.",
    items: [
      "no provider execution",
      "no real video generation",
      "no website creation execution",
      "no avatar generation execution",
      "no render execution",
      "no publish execution",
    ],
  },
  {
    id: "trading-blocks",
    label: "Trading remains paper-review-only",
    summary:
      "The trading desk keeps the risk language strong and elegant without exposing live order or broker surfaces.",
    items: [
      "no financial advice",
      "no personalised recommendations",
      "no buy sell instructions",
      "no trading execution",
      "no paper trading execution",
      "no real-money trading",
      "no broker execution",
      "no live market data calls",
    ],
  },
  {
    id: "workflow-blocks",
    label: "Automation remains blocked",
    summary:
      "Workflow shells show approval and audit order while scheduling, dispatch, and tool execution remain blocked.",
    items: [
      "no schedule execution",
      "no worker dispatch",
      "no tool execution",
      "no autonomous tool execution",
      "no network execution",
      "no API route execution",
    ],
  },
  {
    id: "platform-boundaries",
    label: "Platform boundaries stay explicit",
    summary:
      "Credential, storage, and runtime boundaries remain compact and visible instead of repeated warning paragraphs.",
    items: [
      "no frontend provider key reads",
      "no plaintext secrets",
      "no localStorage",
      "no sessionStorage",
      "no IndexedDB",
      "no cookies",
      "no browser storage for secrets",
      "no shell/process/command execution from the app",
    ],
  },
] as const satisfies readonly JarvisUnifiedProductBlockedActionRecord[];

export const JARVIS_UNIFIED_PRODUCT_DEVELOPER_DIAGNOSTIC_GROUPS = [
  {
    id: "product-ia-phases",
    label: "Jarvis Unified Product IA phases",
    summary:
      "3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish phase pages remain diagnostics only.",
    links: [
      {
        label: "Boundary wiring",
        href: "/jarvis-unified-product-ia-boundary-wiring",
      },
      {
        label: "Home order wiring",
        href: "/jarvis-unified-product-ia-home-order-wiring",
      },
      {
        label: "Video workspace polish wiring",
        href: "/jarvis-unified-product-ia-video-workspace-polish-wiring",
      },
      {
        label: "Developer diagnostics secondary wiring",
        href: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
      },
      {
        label: "Completion",
        href: "/jarvis-unified-product-ia-completion",
      },
    ],
  },
  {
    id: "video-readiness-foundations",
    label: "Video readiness foundations",
    summary:
      "Previous Jarvis video batches remain preserved as secondary references under the new product shell.",
    links: [
      {
        label: "Jarvis video approval packet workspace",
        href: "/jarvis-video-approval-packet-workspace-intent-wiring",
      },
      {
        label: "Jarvis video backend execution readiness",
        href: "/jarvis-video-backend-execution-readiness-dashboard-wiring",
      },
      {
        label: "Jarvis video dry run workspace",
        href: "/jarvis-video-dry-run-workspace-intent-wiring",
      },
    ],
  },
  {
    id: "workspace-shell-foundations",
    label: "Workspace shell foundations",
    summary:
      "Command-center and workspace shell foundations stay secondary and reachable for traceability.",
    links: [
      {
        label: "Unified cockpit boundary",
        href: "/unified-cockpit-boundary",
      },
      {
        label: "Jarvis unified workspace boundary",
        href: "/jarvis-unified-workspace-boundary-wiring",
      },
      {
        label: "Jarvis unified workspace specialist navigation",
        href: "/jarvis-unified-workspace-specialist-navigation-wiring",
      },
      {
        label: "Jarvis control plane boundary",
        href: "/jarvis-control-plane-boundary-wiring",
      },
    ],
  },
] as const satisfies readonly JarvisUnifiedProductDiagnosticsGroup[];

export const JARVIS_UNIFIED_PRODUCT_SURFACES = {
  home: {
    id: "home",
    routeHref: "/",
    label: "Home",
    title: "CodexForge Home",
    eyebrow: "Jarvis Unified Product IA and God-Tier UX Polish",
    badge: "home product order upgraded",
    summary:
      "A clean product entry directs the user from Home to CodexForge Cockpit to Jarvis command center to specialist workspaces. Normal user path is primary and developer diagnostics are secondary.",
    summaryMarkers: [
      "world-class Jarvis product order",
      "home product order upgraded",
      "normal user path is primary",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_HOME_ORDER,
    nextActionIds: [
      "open-cockpit",
      "review-command-center",
      "advance-video-trial",
      "open-diagnostics-second",
    ],
    sectionOrder: [
      "hero",
      "capability-grid",
      "workspace-grid",
      "next-actions",
      "safety",
      "diagnostics",
    ],
    currentFocus:
      "Home answers what Jarvis can do now, what is blocked, what needs approval, and where the operator should go next.",
    heroMetrics: [
      {
        label: "Primary path",
        value: "Home -> Cockpit -> Jarvis",
        detail: "world-class Jarvis product order",
      },
      {
        label: "Active workspace",
        value: "Video Studio",
        detail: "video studio remains primary active workspace",
      },
      {
        label: "Approval mode",
        value: "Approval required",
        detail: "normal user path is primary",
      },
      {
        label: "Diagnostics",
        value: "Secondary",
        detail: "phase pages remain diagnostics only",
      },
    ],
  },
  "codexforge-cockpit": {
    id: "codexforge-cockpit",
    routeHref: "/codexforge-cockpit",
    label: "CodexForge Cockpit",
    title: "CodexForge Cockpit",
    eyebrow: "Premium platform cockpit",
    badge: "premium CodexForge cockpit order upgraded",
    summary:
      "The premium platform cockpit leads with current focus, workspace order, next actions, approvals, readiness, and product flow. Developer diagnostics stay in a secondary dock.",
    summaryMarkers: [
      "premium CodexForge cockpit order upgraded",
      "normal user path is primary",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER,
    nextActionIds: [
      "review-command-center",
      "advance-video-trial",
      "review-trading-safety",
      "audit-before-execution",
    ],
    sectionOrder: [
      "hero",
      "current-focus",
      "workspace-grid",
      "next-actions",
      "approval-readiness",
      "diagnostics",
    ],
    currentFocus:
      "Current focus is controlled execution readiness through a premium product shell, not a diagnostic-first route stack.",
    heroMetrics: [
      {
        label: "Current focus",
        value: "Unified product order",
        detail: "premium CodexForge cockpit order upgraded",
      },
      {
        label: "Next action",
        value: "Video Studio review",
        detail: "controlled trial console only",
      },
      {
        label: "Approvals",
        value: "Visible first",
        detail: "approval required badges stay compact",
      },
      {
        label: "Diagnostics",
        value: "Secondary drawer",
        detail: "phase pages remain diagnostics only",
      },
    ],
  },
  jarvis: {
    id: "jarvis",
    routeHref: "/jarvis",
    label: "Jarvis Command Center",
    title: "Jarvis Command Center",
    eyebrow: "Jarvis OS command center",
    badge: "Jarvis command center order upgraded",
    summary:
      "Jarvis is the operating system / top-level control plane. It now reads as the central AI command center, with capability grid, logical workspace order, permission summary, audit preview, and safety state before diagnostics.",
    summaryMarkers: [
      "Jarvis command center order upgraded",
      "Jarvis is the operating system / top-level control plane.",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
    nextActionIds: [
      "advance-video-trial",
      "review-trading-safety",
      "audit-before-execution",
      "open-diagnostics-second",
    ],
    sectionOrder: [
      "hero",
      "capability-grid",
      "workspace-grid",
      "approval-readiness",
      "audit-preview",
      "safety",
      "diagnostics",
    ],
    currentFocus:
      "Jarvis answers what the control plane can review now, what remains blocked, what needs approval, what backend is required next, and where to go next.",
    heroMetrics: [
      {
        label: "Control plane",
        value: "Jarvis OS",
        detail: "Jarvis command center order upgraded",
      },
      {
        label: "Primary specialist",
        value: "Video Studio",
        detail: "video studio remains primary active workspace",
      },
      {
        label: "Risk posture",
        value: "Approval required",
        detail: "trading and automation remain blocked",
      },
      {
        label: "Execution state",
        value: "Blocked",
        detail: "no direct frontend execution",
      },
    ],
  },
  "jarvis-video": buildWorkspaceSurface(
    "jarvis-video",
    "Jarvis Video Studio",
    "God-tier active specialist workspace",
    "video studio remains primary active workspace"
  ),
  "jarvis-trading": buildWorkspaceSurface(
    "jarvis-trading",
    "Jarvis Trading Desk",
    "Dedicated paper-review-only trading shell",
    "trading workspace has dedicated polished page"
  ),
  "jarvis-websites": buildWorkspaceSurface(
    "jarvis-websites",
    "Jarvis Website Builder",
    "Website workspace shell placeholder",
    "websites workspace placeholder only"
  ),
  "jarvis-avatar": buildWorkspaceSurface(
    "jarvis-avatar",
    "Jarvis Avatar Studio",
    "Avatar workspace shell placeholder",
    "avatar workspace placeholder only"
  ),
  "jarvis-workflows": buildWorkspaceSurface(
    "jarvis-workflows",
    "Jarvis Workflows",
    "Workflow automation shell placeholder",
    "workflows workspace placeholder only"
  ),
  "jarvis-audit": buildWorkspaceSurface(
    "jarvis-audit",
    "Jarvis Audit and Runs",
    "Audit and run review workspace",
    "audit workspace placeholder only"
  ),
  "jarvis-safety": buildWorkspaceSurface(
    "jarvis-safety",
    "Jarvis Safety and Settings",
    "Safety and settings workspace",
    "safety workspace placeholder only"
  ),
} as const satisfies Readonly<
  Record<JarvisUnifiedProductPrimarySurfaceId, JarvisUnifiedProductSurfaceRecord>
>;

export function getJarvisUnifiedProductSurface(
  surfaceId: JarvisUnifiedProductPrimarySurfaceId
): JarvisUnifiedProductSurfaceRecord {
  return JARVIS_UNIFIED_PRODUCT_SURFACES[surfaceId];
}

export function getJarvisUnifiedProductWorkspaceCards(
  workspaceIds: readonly JarvisUnifiedProductWorkspaceId[]
) {
  return workspaceIds.map((workspaceId) =>
    getJarvisUnifiedProductWorkspaceCard(workspaceId)
  );
}

function buildWorkspaceSurface(
  workspaceId: Exclude<JarvisUnifiedProductPrimarySurfaceId, "home" | "codexforge-cockpit" | "jarvis">,
  title: string,
  eyebrow: string,
  badge: string
): JarvisUnifiedProductSurfaceRecord {
  const workspace = getJarvisUnifiedProductWorkspaceCard(workspaceId);

  return {
    id: workspaceId,
    routeHref: workspace.routeHref,
    label: workspace.label,
    title,
    eyebrow,
    badge,
    summary:
      workspace.description +
      " The page answers what this workspace is, what can be reviewed now, what is blocked, what needs approval, what backend is required next, and where the operator should go next.",
    summaryMarkers: [badge, workspace.executionPosture, workspace.approvalPosture],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
    nextActionIds: [
      "advance-video-trial",
      "review-trading-safety",
      "audit-before-execution",
      "open-diagnostics-second",
    ],
    sectionOrder: [
      "hero",
      "workspace-shell",
      "next-actions",
      "approval-readiness",
      "blocked-actions",
      "safety",
      "diagnostics",
    ],
    currentFocus: workspace.primaryNextAction,
    heroMetrics: [
      {
        label: "Status",
        value: formatToneLabel(workspace.status),
        detail: workspace.emphasisLabel,
      },
      {
        label: "Risk tier",
        value: workspace.riskTier,
        detail: workspace.approvalPosture,
      },
      {
        label: "Execution",
        value: workspace.executionPosture,
        detail: workspace.backendRequirementSummary,
      },
      {
        label: "Next action",
        value: workspace.shortLabel,
        detail: workspace.primaryNextAction,
      },
    ],
  };
}

function formatToneLabel(tone: JarvisUnifiedProductStatusTone): string {
  switch (tone) {
    case "ready":
      return "Ready to review";
    case "approval-required":
      return "Approval required";
    case "secondary":
      return "Secondary";
    default:
      return "Blocked";
  }
}

export const JARVIS_UNIFIED_PRODUCT_ALL_WORKSPACE_SUMMARIES =
  JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARDS.map((workspace) => workspace.description)
    .join(" ");
