import type { Route } from "next";
import {
  JARVIS_UNIFIED_PRODUCT_ALL_WORKSPACE_SUMMARIES,
  JARVIS_UNIFIED_PRODUCT_APPROVAL_SUMMARY,
  JARVIS_UNIFIED_PRODUCT_BLOCKED_ACTION_SUMMARIES,
  JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID,
  JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER,
  JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
  JARVIS_UNIFIED_PRODUCT_DEVELOPER_DIAGNOSTIC_GROUPS,
  JARVIS_UNIFIED_PRODUCT_HOME_ORDER,
  JARVIS_UNIFIED_PRODUCT_NEXT_ACTION_RAIL,
  JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER,
  JARVIS_UNIFIED_PRODUCT_READINESS_SUMMARY,
  getJarvisUnifiedProductSurface,
  getJarvisUnifiedProductWorkspaceCards,
  type JarvisUnifiedProductDiagnosticsGroup,
  type JarvisUnifiedProductSurfaceRecord,
  type JarvisUnifiedProductSummaryRecord,
} from "./jarvis-unified-product-ia-content";
import {
  JARVIS_UNIFIED_PRODUCT_SAFETY_POSTURE,
} from "./jarvis-unified-product-ia-safety";
import type {
  JarvisUnifiedProductPrimarySurfaceId,
  JarvisUnifiedProductWorkspaceRecord,
} from "./jarvis-unified-product-ia-workspaces";

export const JARVIS_UNIFIED_PRODUCT_IA_ROUTE_SPECS = [
  [3914, "jarvis-unified-product-ia-boundary-wiring", "/jarvis-unified-product-ia-boundary-wiring", "Jarvis Unified Product IA Boundary Wiring", "Jarvis unified product IA only", "home"],
  [3915, "jarvis-unified-product-ia-intent-wiring", "/jarvis-unified-product-ia-intent-wiring", "Jarvis Unified Product IA Intent Wiring", "world-class Jarvis product order", "jarvis"],
  [3916, "jarvis-unified-product-ia-home-order-wiring", "/jarvis-unified-product-ia-home-order-wiring", "Jarvis Unified Product IA Home Order Wiring", "home product order upgraded", "home"],
  [3917, "jarvis-unified-product-ia-cockpit-order-wiring", "/jarvis-unified-product-ia-cockpit-order-wiring", "Jarvis Unified Product IA Cockpit Order Wiring", "premium CodexForge cockpit order upgraded", "codexforge-cockpit"],
  [3918, "jarvis-unified-product-ia-jarvis-command-center-wiring", "/jarvis-unified-product-ia-jarvis-command-center-wiring", "Jarvis Unified Product IA Jarvis Command Center Wiring", "Jarvis command center order upgraded", "jarvis"],
  [3919, "jarvis-unified-product-ia-primary-workspace-navigation-wiring", "/jarvis-unified-product-ia-primary-workspace-navigation-wiring", "Jarvis Unified Product IA Primary Workspace Navigation Wiring", "normal user path is primary", "jarvis"],
  [3920, "jarvis-unified-product-ia-video-workspace-polish-wiring", "/jarvis-unified-product-ia-video-workspace-polish-wiring", "Jarvis Unified Product IA Video Workspace Polish Wiring", "video studio remains primary active workspace", "jarvis-video"],
  [3921, "jarvis-unified-product-ia-trading-workspace-polish-wiring", "/jarvis-unified-product-ia-trading-workspace-polish-wiring", "Jarvis Unified Product IA Trading Workspace Polish Wiring", "trading workspace has dedicated polished page", "jarvis-trading"],
  [3922, "jarvis-unified-product-ia-website-workspace-placeholder-wiring", "/jarvis-unified-product-ia-website-workspace-placeholder-wiring", "Jarvis Unified Product IA Website Workspace Placeholder Wiring", "websites workspace placeholder only", "jarvis-websites"],
  [3923, "jarvis-unified-product-ia-avatar-workspace-placeholder-wiring", "/jarvis-unified-product-ia-avatar-workspace-placeholder-wiring", "Jarvis Unified Product IA Avatar Workspace Placeholder Wiring", "avatar workspace placeholder only", "jarvis-avatar"],
  [3924, "jarvis-unified-product-ia-workflow-workspace-placeholder-wiring", "/jarvis-unified-product-ia-workflow-workspace-placeholder-wiring", "Jarvis Unified Product IA Workflow Workspace Placeholder Wiring", "workflows workspace placeholder only", "jarvis-workflows"],
  [3925, "jarvis-unified-product-ia-audit-workspace-polish-wiring", "/jarvis-unified-product-ia-audit-workspace-polish-wiring", "Jarvis Unified Product IA Audit Workspace Polish Wiring", "audit workspace placeholder only", "jarvis-audit"],
  [3926, "jarvis-unified-product-ia-safety-workspace-polish-wiring", "/jarvis-unified-product-ia-safety-workspace-polish-wiring", "Jarvis Unified Product IA Safety Workspace Polish Wiring", "safety workspace placeholder only", "jarvis-safety"],
  [3927, "jarvis-unified-product-ia-next-action-rail-wiring", "/jarvis-unified-product-ia-next-action-rail-wiring", "Jarvis Unified Product IA Next Action Rail Wiring", "clear next-action rail", "codexforge-cockpit"],
  [3928, "jarvis-unified-product-ia-capability-grid-wiring", "/jarvis-unified-product-ia-capability-grid-wiring", "Jarvis Unified Product IA Capability Grid Wiring", "capability grid", "jarvis"],
  [3929, "jarvis-unified-product-ia-approval-summary-wiring", "/jarvis-unified-product-ia-approval-summary-wiring", "Jarvis Unified Product IA Approval Summary Wiring", "approval-required", "jarvis"],
  [3930, "jarvis-unified-product-ia-readiness-summary-wiring", "/jarvis-unified-product-ia-readiness-summary-wiring", "Jarvis Unified Product IA Readiness Summary Wiring", "backend-only", "codexforge-cockpit"],
  [3931, "jarvis-unified-product-ia-blocked-action-simplification-wiring", "/jarvis-unified-product-ia-blocked-action-simplification-wiring", "Jarvis Unified Product IA Blocked Action Simplification Wiring", "blocked action summary", "jarvis"],
  [3932, "jarvis-unified-product-ia-placeholder-state-system-wiring", "/jarvis-unified-product-ia-placeholder-state-system-wiring", "Jarvis Unified Product IA Placeholder State System Wiring", "placeholders are intentional", "jarvis"],
  [3933, "jarvis-unified-product-ia-developer-diagnostics-secondary-wiring", "/jarvis-unified-product-ia-developer-diagnostics-secondary-wiring", "Jarvis Unified Product IA Developer Diagnostics Secondary Wiring", "developer diagnostics are secondary", "codexforge-cockpit"],
  [3934, "jarvis-unified-product-ia-command-palette-order-wiring", "/jarvis-unified-product-ia-command-palette-order-wiring", "Jarvis Unified Product IA Command Palette Order Wiring", "normal user path is primary", "jarvis"],
  [3935, "jarvis-unified-product-ia-navigation-shell-order-wiring", "/jarvis-unified-product-ia-navigation-shell-order-wiring", "Jarvis Unified Product IA Navigation Shell Order Wiring", "world-class Jarvis product order", "codexforge-cockpit"],
  [3936, "jarvis-unified-product-ia-mobile-responsive-polish-wiring", "/jarvis-unified-product-ia-mobile-responsive-polish-wiring", "Jarvis Unified Product IA Mobile Responsive Polish Wiring", "mobile responsive polish", "home"],
  [3937, "jarvis-unified-product-ia-accessibility-guard-wiring", "/jarvis-unified-product-ia-accessibility-guard-wiring", "Jarvis Unified Product IA Accessibility Guard Wiring", "accessibility guard", "home"],
  [3938, "jarvis-unified-product-ia-motion-safety-wiring", "/jarvis-unified-product-ia-motion-safety-wiring", "Jarvis Unified Product IA Motion Safety Wiring", "motion safety", "home"],
  [3939, "jarvis-unified-product-ia-performance-budget-wiring", "/jarvis-unified-product-ia-performance-budget-wiring", "Jarvis Unified Product IA Performance Budget Wiring", "performance budget", "codexforge-cockpit"],
  [3940, "jarvis-unified-product-ia-no-execution-guard-wiring", "/jarvis-unified-product-ia-no-execution-guard-wiring", "Jarvis Unified Product IA No Execution Guard Wiring", "no direct frontend execution", "jarvis-video"],
  [3941, "jarvis-unified-product-ia-regression-coverage-wiring", "/jarvis-unified-product-ia-regression-coverage-wiring", "Jarvis Unified Product IA Regression Coverage Wiring", "phase pages remain diagnostics only", "jarvis"],
  [3942, "jarvis-unified-product-ia-checkpoint-alignment-wiring", "/jarvis-unified-product-ia-checkpoint-alignment-wiring", "Jarvis Unified Product IA Checkpoint Alignment Wiring", "checkpoint alignment", "codexforge-cockpit"],
  [3943, "jarvis-unified-product-ia-operator-review-wiring", "/jarvis-unified-product-ia-operator-review-wiring", "Jarvis Unified Product IA Operator Review Wiring", "operator review required before any execution", "jarvis-video"],
  [3944, "jarvis-unified-product-ia-readiness-wiring", "/jarvis-unified-product-ia-readiness-wiring", "Jarvis Unified Product IA Readiness Wiring", "readiness", "jarvis"],
  [3945, "jarvis-unified-product-ia-completion", "/jarvis-unified-product-ia-completion", "Jarvis Unified Product IA Completion", "next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial", "jarvis-video"],
] as const;

type JarvisUnifiedProductIaRouteSpec =
  (typeof JARVIS_UNIFIED_PRODUCT_IA_ROUTE_SPECS)[number];

export type JarvisUnifiedProductIaRouteSlug =
  JarvisUnifiedProductIaRouteSpec[1];

export type JarvisUnifiedProductIaRouteHref =
  JarvisUnifiedProductIaRouteSpec[2];

export type JarvisUnifiedProductIaRouteTitle =
  JarvisUnifiedProductIaRouteSpec[3];

export type JarvisUnifiedProductIaRouteFocus =
  JarvisUnifiedProductIaRouteSpec[4];

export type JarvisUnifiedProductIaRouteSurfaceId =
  JarvisUnifiedProductIaRouteSpec[5];

export const JARVIS_UNIFIED_PRODUCT_IA_BATCH_MARKERS = [
  "3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish",
  "3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish Mega Batch v1",
  "Jarvis Unified Product IA and God-Tier UX Polish",
  "Jarvis unified product IA only",
  "world-class Jarvis product order",
  "home product order upgraded",
  "premium CodexForge cockpit order upgraded",
  "Jarvis command center order upgraded",
  "video studio remains primary active workspace",
  "trading workspace has dedicated polished page",
  "websites workspace placeholder only",
  "avatar workspace placeholder only",
  "workflows workspace placeholder only",
  "audit workspace placeholder only",
  "safety workspace placeholder only",
  "normal user path is primary",
  "developer diagnostics are secondary",
  "phase pages remain diagnostics only",
  "placeholders are intentional",
  "next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial",
] as const;

export const JARVIS_UNIFIED_PRODUCT_IA_REVIEW_DESCRIPTION =
  "Review 3914-3945 - Jarvis Unified Product IA and God-Tier UX Polish as a frontend-safe, review-only productization batch. Jarvis is the operating system / top-level control plane. CodexForge is the platform shell. This batch upgrades home product order, premium CodexForge cockpit order, Jarvis command center order, primary workspace navigation order, next-action order, approval summary order, readiness summary order, blocked action simplification, placeholder state system, command palette order, navigation shell order, mobile responsive polish, accessibility guard, motion safety, performance budget, no-execution guard, regression coverage, checkpoint alignment, operator review, readiness, and completion without enabling execution. Video studio remains primary active workspace. Trading workspace has dedicated polished page. Websites workspace placeholder only. Avatar workspace placeholder only. Workflows workspace placeholder only. Audit workspace placeholder only. Safety workspace placeholder only. Normal user path is primary and developer diagnostics are secondary. Phase pages remain diagnostics only. Placeholders are intentional. No direct frontend execution, no provider execution, no live provider execution, no video provider execution, no image provider execution, no audio provider execution, no website creation execution, no avatar generation execution, no chatbot autonomous execution, no trading execution, no paper trading execution, no real-money trading execution, no tool execution, no autonomous tool execution, no network execution, no render execution, no export execution, no publish execution, no worker dispatch, no file export, no download generation, no archive creation, no signed URL creation, no platform upload, no media upload, no OAuth flow creation, no webhook creation, no schedule execution, no account authorization execution, no API route execution, no service creation, no runtime deploy, no file writes from the app, no shell/process/command execution from the app, no fetch/network calls, no provider SDK imports in frontend, no frontend provider key reads, no plaintext secrets, no localStorage, no sessionStorage, no IndexedDB, no cookies, and no browser storage for secrets. Trading remains paper-review-only, no financial advice, no personalised recommendations, no buy sell instructions, no broker execution, and no live market data calls. Next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial.";

function buildJarvisUnifiedProductIaRouteSummary(
  title: JarvisUnifiedProductIaRouteTitle,
  focus: JarvisUnifiedProductIaRouteFocus,
  surface: JarvisUnifiedProductSurfaceRecord
) {
  return (
    title +
    " keeps Jarvis unified product IA only across " +
    surface.label +
    ". Focus: " +
    focus +
    ". This batch keeps world-class Jarvis product order, normal user path is primary, developer diagnostics are secondary, placeholders are intentional, and no direct frontend execution. Next likely batch: 3946-3977 - First Jarvis-Controlled Video Controlled Execution Trial."
  );
}

function buildJarvisUnifiedProductIaRouteMarkers(
  phaseNumber: JarvisUnifiedProductIaRouteSpec[0],
  slug: JarvisUnifiedProductIaRouteSlug,
  href: JarvisUnifiedProductIaRouteHref,
  title: JarvisUnifiedProductIaRouteTitle,
  focus: JarvisUnifiedProductIaRouteFocus,
  surface: JarvisUnifiedProductSurfaceRecord
) {
  return [
    String(phaseNumber),
    slug,
    href,
    title,
    focus,
    surface.label,
    ...JARVIS_UNIFIED_PRODUCT_IA_BATCH_MARKERS,
  ] as const;
}

function buildJarvisUnifiedProductIaRoute(
  phaseNumber: JarvisUnifiedProductIaRouteSpec[0],
  slug: JarvisUnifiedProductIaRouteSlug,
  href: JarvisUnifiedProductIaRouteHref,
  title: JarvisUnifiedProductIaRouteTitle,
  focus: JarvisUnifiedProductIaRouteFocus,
  surfaceId: JarvisUnifiedProductIaRouteSurfaceId
) {
  const surface = getJarvisUnifiedProductSurface(surfaceId);

  return {
    slug,
    href,
    phase: `Phase ${phaseNumber}`,
    phaseNumber,
    title,
    focus,
    surfaceId,
    commandLabel: `Go to ${title}`,
    summary: buildJarvisUnifiedProductIaRouteSummary(title, focus, surface),
    markerPhrases: buildJarvisUnifiedProductIaRouteMarkers(
      phaseNumber,
      slug,
      href,
      title,
      focus,
      surface
    ),
  } as const;
}

export const JARVIS_UNIFIED_PRODUCT_IA_ROUTES =
  JARVIS_UNIFIED_PRODUCT_IA_ROUTE_SPECS.map(
    ([phaseNumber, slug, href, title, focus, surfaceId]) =>
      buildJarvisUnifiedProductIaRoute(
        phaseNumber,
        slug,
        href,
        title,
        focus,
        surfaceId
      )
  );

export type JarvisUnifiedProductIaRoute =
  (typeof JARVIS_UNIFIED_PRODUCT_IA_ROUTES)[number];

export function buildJarvisUnifiedProductIaStableKey(
  parts: readonly string[]
): string {
  return parts.join("::");
}

export function buildJarvisUnifiedProductIaRouteModel(
  routeSlug: JarvisUnifiedProductIaRouteSlug
) {
  const route =
    JARVIS_UNIFIED_PRODUCT_IA_ROUTES.find(
      (candidate) => candidate.slug === routeSlug
    ) ?? JARVIS_UNIFIED_PRODUCT_IA_ROUTES[0];
  const surface = getJarvisUnifiedProductSurface(route.surfaceId);

  return buildJarvisUnifiedProductIaSurfaceModel(surface.id, route);
}

export function buildJarvisUnifiedProductIaSurfaceModel(
  surfaceId: JarvisUnifiedProductPrimarySurfaceId,
  route?: JarvisUnifiedProductIaRoute
) {
  const surface = getJarvisUnifiedProductSurface(surfaceId);
  const workspaces = getJarvisUnifiedProductWorkspaceCards(surface.workspaceOrder);

  return {
    route,
    surface,
    workspaces,
    homeProductOrder: JARVIS_UNIFIED_PRODUCT_HOME_ORDER,
    cockpitProductOrder: JARVIS_UNIFIED_PRODUCT_COCKPIT_ORDER,
    jarvisCommandCenterOrder: JARVIS_UNIFIED_PRODUCT_COMMAND_CENTER_ORDER,
    primaryNavigationOrder: JARVIS_UNIFIED_PRODUCT_PRIMARY_NAVIGATION_ORDER,
    nextActionRail: JARVIS_UNIFIED_PRODUCT_NEXT_ACTION_RAIL.filter((action) =>
      surface.nextActionIds.includes(action.id)
    ),
    capabilityGrid: JARVIS_UNIFIED_PRODUCT_CAPABILITY_GRID,
    approvalSummary: JARVIS_UNIFIED_PRODUCT_APPROVAL_SUMMARY,
    readinessSummary: JARVIS_UNIFIED_PRODUCT_READINESS_SUMMARY,
    blockedActionSummaries: JARVIS_UNIFIED_PRODUCT_BLOCKED_ACTION_SUMMARIES,
    developerDiagnosticGroups:
      JARVIS_UNIFIED_PRODUCT_DEVELOPER_DIAGNOSTIC_GROUPS,
    safetyPosture: JARVIS_UNIFIED_PRODUCT_SAFETY_POSTURE,
    batchMarkers: JARVIS_UNIFIED_PRODUCT_IA_BATCH_MARKERS,
    reviewDescription: JARVIS_UNIFIED_PRODUCT_IA_REVIEW_DESCRIPTION,
    allWorkspaceSummaries: JARVIS_UNIFIED_PRODUCT_ALL_WORKSPACE_SUMMARIES,
  } as const;
}

export type JarvisUnifiedProductIaSurfaceModel = ReturnType<
  typeof buildJarvisUnifiedProductIaSurfaceModel
>;

export type JarvisUnifiedProductIaDiagnosticsModel = readonly JarvisUnifiedProductDiagnosticsGroup[];
export type JarvisUnifiedProductIaSummaryModel = readonly JarvisUnifiedProductSummaryRecord[];
export type JarvisUnifiedProductIaWorkspaceModel = readonly JarvisUnifiedProductWorkspaceRecord[];

