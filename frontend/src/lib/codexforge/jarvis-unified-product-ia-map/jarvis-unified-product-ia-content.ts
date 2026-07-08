import type { Route } from "next";
import type {
  JarvisUnifiedProductPrimarySurfaceId,
  JarvisUnifiedProductWorkspaceRecord,
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
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-trading",
  "jarvis-workflows",
  "jarvis-audit",
  "jarvis-safety",
  "developer-diagnostics",
] as const satisfies readonly JarvisUnifiedProductWorkspaceId[];

export const JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER = [
  "jarvis-video",
  "jarvis-websites",
  "jarvis-avatar",
  "jarvis-trading",
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
  "/jarvis-websites",
  "/jarvis-avatar",
  "/jarvis-trading",
  "/jarvis-workflows",
  "/jarvis-audit",
  "/jarvis-safety",
  "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
] as const satisfies readonly Route[];

export type JarvisUnifiedProductPrimaryNavigationHref =
  (typeof JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER)[number];

export const JARVIS_UNIFIED_PRODUCT_NEXT_ACTION_RAIL = [
  {
    id: "start-video-studio",
    label: "Start with Video Studio",
    summary:
      "Review the mission brief, approval packet, backend readiness, and result recovery plan in one premium studio.",
    routeHref: "/jarvis-video",
    tone: "approval-required",
    backendRequired:
      "Generation stays locked. Backend-owned execution required. No provider call from frontend.",
  },
  {
    id: "open-cockpit",
    label: "Open CodexForge Cockpit",
    summary:
      "See the current mission, workspace launchers, approval state, backend readiness, and blocked actions.",
    routeHref: "/codexforge-cockpit",
    tone: "ready",
    backendRequired:
      "Cockpit is a review-only control surface with no execution path.",
  },
  {
    id: "review-command-center",
    label: "Open Jarvis Command Center",
    summary:
      "Launch the right workspace from Jarvis OS and review capability, audit, and safety state.",
    routeHref: "/jarvis",
    tone: "ready",
    backendRequired:
      "Jarvis remains a review and routing surface only.",
  },
  {
    id: "advance-video-trial",
    label: "Continue Video Studio",
    summary:
      "Review the mission brief, readiness score, prerequisite lanes, approval packet, and blocked actions before backend handoff.",
    routeHref: "/jarvis-video",
    tone: "approval-required",
    backendRequired:
      "Backend-owned execution required. No provider call from frontend. Backend runner services, audit persistence, credential isolation, lock and idempotency, and result handoff remain future backend work only.",
  },
  {
    id: "review-website-builder",
    label: "Review Website Builder",
    summary:
      "Walk the brief, sitemap, design system, page plan, and publish gate while preview and publish stay blocked.",
    routeHref: "/jarvis-websites",
    tone: "blocked",
    backendRequired:
      "Preview, export, and deploy remain future backend-owned work.",
  },
  {
    id: "review-avatar-studio",
    label: "Review Avatar Studio",
    summary:
      "Confirm persona, consent, voice and visual style, and safety before any future preview path exists.",
    routeHref: "/jarvis-avatar",
    tone: "blocked",
    backendRequired:
      "Consent tracking and preview rendering remain backend-owned future work.",
  },
  {
    id: "review-trading-safety",
    label: "Open Trading Desk",
    summary:
      "Keep trading paper-review-only with strategy review, risk governor, approval state, and blocked execution.",
    routeHref: "/jarvis-trading",
    tone: "approval-required",
    backendRequired:
      "No financial advice, no broker execution, and no live market calls.",
  },
  {
    id: "review-workflow-lanes",
    label: "Review Workflow planning",
    summary:
      "Follow triggers, permissions, dry runs, approval, and audit while scheduling and dispatch stay blocked.",
    routeHref: "/jarvis-workflows",
    tone: "blocked",
    backendRequired:
      "Planner, approval routing, and execution services remain backend-owned future work.",
  },
  {
    id: "review-audit-ledger",
    label: "Review Audit and Runs",
    summary:
      "Check the timeline, approvals, blocked actions, result ledger, and evidence packets before any backend handoff.",
    routeHref: "/jarvis-audit",
    tone: "ready",
    backendRequired:
      "Persistent audit storage remains backend-owned future work.",
  },
  {
    id: "review-safety-dashboard",
    label: "Review Safety and Settings",
    summary:
      "Check the kill switch, approval mode, credential boundary, and browser storage boundary.",
    routeHref: "/jarvis-safety",
    tone: "ready",
    backendRequired:
      "Credential vaulting and permission enforcement remain backend-only.",
  },
  {
    id: "open-diagnostics-second",
    label: "Open developer diagnostics",
    summary:
      "Use wiring, smoke, and traceability pages only after the main product surfaces stop answering the question.",
    routeHref: "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring",
    tone: "secondary",
    backendRequired:
      "Diagnostics stay secondary and do not enable execution.",
  },
] as const satisfies readonly JarvisUnifiedProductNextActionRecord[];

export const JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID = [
  {
    id: "video-review",
    label: "Video planning and review",
    summary:
      "Mission brief, video production timeline, readiness score, prerequisite lanes, backend rails, next action card, and lower-priority diagnostics stay visible in one premium studio.",
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
    label: "Operator approval",
    summary: "Every execution path stays behind an explicit operator approval gate.",
    tone: "approval-required",
  },
  {
    id: "video-approval",
    label: "Video Studio",
    summary:
      "Approval packet review stays active while controlled execution remains blocked.",
    tone: "approval-required",
  },
  {
    id: "trading-approval",
    label: "Trading Desk",
    summary:
      "Explicit operator approval required with no financial advice, no personalised recommendations, and no buy sell instructions.",
    tone: "approval-required",
  },
  {
    id: "workflow-approval",
    label: "Workflow planning",
    summary:
      "Permission and approval lanes stay visible even though dry run and automation are blocked.",
    tone: "approval-required",
  },
  {
    id: "safety-controls",
    label: "Safety and credentials",
    summary:
      "Kill switch, credential boundaries, and browser-storage limits stay visible in the normal path.",
    tone: "ready",
  },
] as const satisfies readonly JarvisUnifiedProductSummaryRecord[];

export const JARVIS_UNIFIED_PRODUCT_READINESS_SUMMARY = [
  {
    id: "product-order",
    label: "Product path",
    summary:
      "Home, Cockpit, Jarvis, and the specialist workspaces now read like one product instead of separate checkpoints.",
    tone: "ready",
  },
  {
    id: "video-readiness",
    label: "Video Studio",
    summary:
      "Video studio stays premium and visible while the locked controlled trial console shows backend-owned trial prerequisites as review-only markers.",
    tone: "approval-required",
  },
  {
    id: "workspace-shells",
    label: "Workspace coverage",
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
    id: "backend-handoff",
    label: "Backend handoff",
    summary:
      "Runner planning is drafted, result review is staged, and backend implementation remains the next step.",
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
    title: "CodexForge Operator Cockpit",
    eyebrow: "Controlled workspace",
    badge: "Start here",
    summary:
      "Build, review, and safely hand off AI workflows from one controlled workspace.",
    summaryMarkers: [
      "world-class Jarvis product order",
      "home product order upgraded",
      "normal user path is primary",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_HOME_ORDER,
    nextActionIds: [
      "start-video-studio",
      "open-cockpit",
      "review-command-center",
      "open-diagnostics-second",
    ],
    sectionOrder: [
      "hero",
      "next-actions",
      "workspace-grid",
      "safety",
      "diagnostics",
    ],
    currentFocus:
      "Open Jarvis Video Studio first, then review the other specialist surfaces without leaving the controlled workspace.",
    heroMetrics: [
      {
        label: "Workspace",
        value: "Operator cockpit",
        detail: "Video, websites, avatars, workflows, approvals, and safety in one controlled entry point.",
      },
      {
        label: "Start here",
        value: "Video Studio",
        detail: "Open the video brief console, preview surface, and locked handoff controls first.",
      },
      {
        label: "Route order",
        value: "Action first",
        detail: "Useful product routes stay above diagnostics, checkpoints, and technical traceability.",
      },
      {
        label: "Safety",
        value: "Locked by default",
        detail: "Execution stays blocked and backend-only handoff remains approval-gated from the frontend.",
      },
    ],
  },
  "codexforge-cockpit": {
    id: "codexforge-cockpit",
    routeHref: "/codexforge-cockpit",
    label: "CodexForge Cockpit",
    title: "CodexForge Cockpit",
    eyebrow: "Mission control dashboard",
    badge: "Current mission",
    summary:
      "Mission control for the Jarvis product: current mission, primary action, workspace launchers, approval state, backend readiness, and blocked actions.",
    summaryMarkers: [
      "premium CodexForge cockpit order upgraded",
      "normal user path is primary",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER,
    nextActionIds: [
      "advance-video-trial",
      "review-audit-ledger",
      "review-safety-dashboard",
      "open-diagnostics-second",
    ],
    sectionOrder: [
      "hero",
      "current-focus",
      "next-actions",
      "workspace-grid",
      "approval-readiness",
      "blocked-actions",
      "diagnostics",
    ],
    currentFocus:
      "Current mission: Jarvis Video Studio Release Candidate. Review readiness, approvals, backend handoff, and blocked execution from one cockpit.",
    heroMetrics: [
      {
        label: "Current mission",
        value: "Video Studio",
        detail: "Jarvis Video Studio Release Candidate is the main product focus.",
      },
      {
        label: "Workspaces",
        value: "7 launchers",
        detail: "Video, websites, avatars, trading, workflows, audit, and safety stay in clean order.",
      },
      {
        label: "Approval",
        value: "Visible first",
        detail: "Operator review, backend readiness, and blocked actions stay above diagnostics.",
      },
      {
        label: "Diagnostics",
        value: "Secondary",
        detail: "Wiring, smoke, and traceability stay lower and out of the main flow.",
      },
    ],
  },
  jarvis: {
    id: "jarvis",
    routeHref: "/jarvis",
    label: "Jarvis Command Center",
    title: "Jarvis",
    eyebrow: "Jarvis OS command center",
    badge: "Capability launcher",
    summary:
      "Jarvis OS brings together capability launchers, workspace order, approval state, audit preview, and safety state in one control plane.",
    summaryMarkers: [
      "Jarvis command center order upgraded",
      "Jarvis is the operating system / top-level control plane.",
      "developer diagnostics are secondary",
    ],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
    nextActionIds: [
      "advance-video-trial",
      "review-trading-safety",
      "review-audit-ledger",
      "review-safety-dashboard",
    ],
    sectionOrder: [
      "hero",
      "next-actions",
      "capability-grid",
      "workspace-grid",
      "approval-readiness",
      "audit-preview",
      "safety",
      "diagnostics",
    ],
    currentFocus:
      "Choose the right workspace, confirm approval state, and keep execution locked until backend handoff is approved.",
    heroMetrics: [
      {
        label: "Control plane",
        value: "Jarvis OS",
        detail: "Capability launchers, audit preview, and safety state stay in one control plane.",
      },
      {
        label: "Primary workspace",
        value: "Video Studio",
        detail: "Video Studio remains the main release candidate workspace.",
      },
      {
        label: "Audit",
        value: "Visible",
        detail: "Run timeline, approvals, evidence, and result review stay easy to scan.",
      },
      {
        label: "Safety",
        value: "Approval required",
        detail: "Execution stays blocked across provider, broker, render, publish, and workflow paths.",
      },
    ],
  },
  "jarvis-video": buildWorkspaceSurface(
    "jarvis-video",
    "Jarvis Video Studio",
    "Premium video studio release candidate",
    "Mission control",
    [
      "advance-video-trial",
      "review-audit-ledger",
      "review-safety-dashboard",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-trading": buildWorkspaceSurface(
    "jarvis-trading",
    "Jarvis Trading Desk",
    "Paper-review-only trading desk",
    "Paper review only",
    [
      "review-trading-safety",
      "review-audit-ledger",
      "review-safety-dashboard",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-websites": buildWorkspaceSurface(
    "jarvis-websites",
    "Jarvis Website Builder",
    "Website builder workspace",
    "Blocked until backend preview",
    [
      "review-website-builder",
      "review-safety-dashboard",
      "review-audit-ledger",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-avatar": buildWorkspaceSurface(
    "jarvis-avatar",
    "Jarvis Avatar Studio",
    "Avatar studio workspace",
    "Blocked until consent and preview",
    [
      "review-avatar-studio",
      "review-safety-dashboard",
      "review-audit-ledger",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-workflows": buildWorkspaceSurface(
    "jarvis-workflows",
    "Jarvis Workflows",
    "Workflow planning workspace",
    "Blocked until backend automation",
    [
      "review-workflow-lanes",
      "review-safety-dashboard",
      "review-audit-ledger",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-audit": buildWorkspaceSurface(
    "jarvis-audit",
    "Jarvis Audit and Runs",
    "Evidence and run review",
    "Review-only workspace",
    [
      "review-audit-ledger",
      "review-safety-dashboard",
      "advance-video-trial",
      "open-diagnostics-second",
    ]
  ),
  "jarvis-safety": buildWorkspaceSurface(
    "jarvis-safety",
    "Jarvis Safety and Settings",
    "Safety dashboard",
    "Safety control plane",
    [
      "review-safety-dashboard",
      "review-audit-ledger",
      "advance-video-trial",
      "open-diagnostics-second",
    ]
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
  badge: string,
  nextActionIds: readonly string[]
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
      " The page leads with a workspace overview, a clear next action, visible safety state, and secondary diagnostics.",
    summaryMarkers: [badge, workspace.executionPosture, workspace.approvalPosture],
    workspaceOrder: JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
    nextActionIds,
    sectionOrder: [
      "hero",
      "next-actions",
      "workspace-shell",
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
        label: "Approval",
        value: workspace.approvalPosture,
        detail: formatRiskTierLabel(workspace.riskTier),
      },
      {
        label: "Execution",
        value: workspace.executionPosture,
        detail: "Backend handoff stays required before any real execution path exists.",
      },
      {
        label: "Focus",
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

function formatRiskTierLabel(
  riskTier: JarvisUnifiedProductWorkspaceRecord["riskTier"]
): string {
  switch (riskTier) {
    case "tier-1-platform":
      return "Platform boundary";
    case "tier-2-creative":
      return "Creative boundary";
    default:
      return "Market boundary";
  }
}

export const JARVIS_UNIFIED_PRODUCT_ALL_WORKSPACE_SUMMARIES =
  JARVIS_UNIFIED_PRODUCT_WORKSPACE_CARDS.map((workspace) => workspace.description)
    .join(" ");
