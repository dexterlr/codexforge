import type {
  DashboardDensityNavigationPolish,
  DashboardDensityNavigationPolishBoundary,
  DashboardDensityNavigationPolishModel,
} from "./dashboard-density-navigation-polish-types";
import { buildDashboardDensityNavigationPolishStableKey } from "./dashboard-density-navigation-polish-types";

export const DASHBOARD_DENSITY_NAVIGATION_POLISH_LANGUAGE = [
  "Dashboard density navigation polish",
  "Dashboard density review does not remove route coverage",
  "Navigation changes require review before removal",
  "No route is executed from this page",
  "Protected route coverage",
  "Expert fast path adjustments",
] as const;

export function buildDashboardDensityNavigationPolish(
  input: Omit<DashboardDensityNavigationPolish, "id"> & { idHint: string }
): DashboardDensityNavigationPolish {
  const { idHint, ...review } = input;
  return {
    id: buildDashboardDensityNavigationPolishStableKey(
      "dashboard-density-navigation-polish",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildDashboardDensityNavigationPolishReviews(): DashboardDensityNavigationPolish[] {
  return [
    buildDashboardDensityNavigationPolish({
      idHint: "daily-cockpit-density",
      status: "ready-for-review",
      dashboardPolishIdentity:
        "Dashboard polish identity: dashboard-density-navigation-polish-daily-cockpit.",
      currentNavigationGroups: [
        "Current navigation groups: Start, Fix, Build, Audit, Memory, Creative, Advanced, provider, connector, automation, and project knowledge review routes remain available.",
        "Current navigation groups: novice mode stays plain-English, expert mode stays compact, and the command registry remains route-only for this review.",
      ],
      densityRisks: [
        "Density risks: daily cockpit density can hide approval gates when too many review links are shown at once.",
        "Density risks: repeated route chips, duplicate menus, and long hero copy can make novice review harder without adding safety.",
      ],
      noviceModeAdjustments: [
        "Novice mode adjustments: keep Daily home, Global inbox, Approval queue, Result history, Safety matrix, Recovery playbook, and Privacy audit visible in plain English.",
        "Novice mode adjustments: explain blocked work before showing expert shortcuts.",
      ],
      expertFastPathAdjustments: [
        "Expert fast path adjustments: expert operators may jump directly to approval queue, result history, safety matrix, cross-loop search review, or privacy audit review.",
        "Expert fast path adjustments: shortcuts compress copy but keep blocked reasons, audit posture, and approval required language visible.",
      ],
      protectedRouteCoverage: [
        "Protected route coverage: dashboard density review does not remove route coverage.",
        "Protected route coverage: navigation changes require review before removal, and no route is executed from this page.",
      ],
      crossLoopSearchRoute:
        "Cross-loop search route: /cross-loop-search-review reviews search design and does not run searches from this page.",
      privacyAuditRoute:
        "Privacy audit route: /local-first-privacy-audit reviews local-first guarantees and does not scan local files.",
      blockedReasons: [
        "Blocked reasons: any request to remove routes, run a route, call APIs, scan projects, store tokens, mutate files, or promote memory stays blocked.",
        "Blocked reasons: unresolved density, privacy, search, approval, or route coverage questions require operator review before navigation changes.",
      ],
      advancedDensityDetails:
        "Advanced density details: dashboard density navigation polish is review-only. It does not execute routes, remove route coverage, approve actions, run workflows, run searches, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, send prompt/file/project/connector data without approval, scan arbitrary projects, browse files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildDashboardDensityNavigationPolish({
      idHint: "route-removal-request",
      status: "blocked",
      dashboardPolishIdentity:
        "Dashboard polish identity: dashboard-density-navigation-polish-route-removal-request.",
      currentNavigationGroups: [
        "Current navigation groups: all existing route groups remain protected while the removal request is reviewed.",
      ],
      densityRisks: [
        "Density risks: removing a route to reduce clutter can hide safety, history, privacy, or recovery review coverage.",
      ],
      noviceModeAdjustments: [
        "Novice mode adjustments: keep the safer route visible and use plain-English grouping before considering removal.",
      ],
      expertFastPathAdjustments: [
        "Expert fast path adjustments: expert shortcuts cannot bypass route coverage review or approval boundaries.",
      ],
      protectedRouteCoverage: [
        "Protected route coverage: no route coverage removal is allowed from this page.",
        "Protected route coverage: route removals need a separate reviewed change plan.",
      ],
      crossLoopSearchRoute:
        "Cross-loop search route: /cross-loop-search-review stays available for review-only search planning.",
      privacyAuditRoute:
        "Privacy audit route: /local-first-privacy-audit stays available for local-first privacy review.",
      blockedReasons: [
        "Blocked reasons: route removal, duplicate menu cleanup, and command registry changes stay blocked until reviewed.",
      ],
      advancedDensityDetails:
        "Advanced density details: route removal requests remain blocked here. The page can describe density risks but cannot execute, mutate registries, remove routes, write files, call APIs, or approve navigation changes automatically.",
    }),
  ];
}

export function buildDashboardDensityNavigationPolishBoundary(): DashboardDensityNavigationPolishBoundary {
  return {
    dashboardDensityReviewOnly: true,
    dashboardDensityReviewDoesNotRemoveRouteCoverage: true,
    navigationChangesRequireReviewBeforeRemoval: true,
    noRouteIsExecutedFromThisPage: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    routeExecutionAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    searchExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeDashboardDensityNavigationPolish(
  model: Pick<DashboardDensityNavigationPolishModel, "reviews">
): string {
  return `Dashboard density navigation polish prepares ${model.reviews.length} dashboard density review posture(s). Dashboard density review does not remove route coverage, navigation changes require review before removal, and no route is executed from this page.`;
}

export function buildDashboardDensityNavigationPolishModel(): DashboardDensityNavigationPolishModel {
  const reviews = buildDashboardDensityNavigationPolishReviews();
  const model: DashboardDensityNavigationPolishModel = {
    title: "Dashboard density navigation polish",
    summary: "",
    reviews,
    boundary: buildDashboardDensityNavigationPolishBoundary(),
    dashboardLanguage: [...DASHBOARD_DENSITY_NAVIGATION_POLISH_LANGUAGE],
    advancedDetails: [
      "Dashboard density navigation polish",
      "Dashboard polish identity",
      "Current navigation groups",
      "Density risks",
      "Novice mode adjustments",
      "Expert fast path adjustments",
      "Protected route coverage",
      "Cross-loop search route",
      "Privacy audit route",
      "Blocked reasons",
      "Dashboard density review does not remove route coverage",
      "Navigation changes require review before removal",
      "No route is executed from this page",
      "advanced density details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDashboardDensityNavigationPolish(model) };
}
