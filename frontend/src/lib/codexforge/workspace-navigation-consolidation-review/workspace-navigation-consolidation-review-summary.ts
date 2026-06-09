import type {
  WorkspaceNavigationConsolidationBoundary,
  WorkspaceNavigationConsolidationReview,
  WorkspaceNavigationConsolidationReviewModel,
} from "./workspace-navigation-consolidation-review-types";
import { buildWorkspaceNavigationConsolidationReviewStableKey } from "./workspace-navigation-consolidation-review-types";

export const WORKSPACE_NAVIGATION_CONSOLIDATION_REVIEW_LANGUAGE = [
  "Workspace navigation consolidation review",
  "Navigation consolidation does not remove route coverage",
  "Route changes require review before removal",
  "No route is executed from this page",
  "Route group summary",
  "Command registry coverage",
] as const;

export function buildWorkspaceNavigationConsolidationReview(
  input: Omit<WorkspaceNavigationConsolidationReview, "id"> & { idHint: string }
): WorkspaceNavigationConsolidationReview {
  const { idHint, ...review } = input;
  return {
    id: buildWorkspaceNavigationConsolidationReviewStableKey(
      "workspace-navigation-consolidation-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildWorkspaceNavigationConsolidationReviews(): WorkspaceNavigationConsolidationReview[] {
  return [
    buildWorkspaceNavigationConsolidationReview({
      idHint: "reviewed-unified-home-navigation",
      status: "ready-for-review",
      consolidationReviewIdentity:
        "Consolidation review identity: workspace-navigation-consolidation-review-reviewed-unified-home-navigation.",
      sourceUnifiedHome:
        "Source unified home: /unified-workspace-home-review summarizes the major CodexForge loops before navigation density is reviewed.",
      routeGroupSummary: [
        "Route group summary: Start keeps operator entrypoints and workspace home review visible.",
        "Route group summary: Build keeps project knowledge and safe coding planning routes visible.",
        "Route group summary: Fix keeps validation, apply, regression, and stabilization routes visible.",
        "Route group summary: Brain, Memory, Creative, Audit, and Advanced keep their existing coverage and remain available through the shell and command palette.",
      ],
      commandRegistryCoverage: [
        "Command registry coverage: route commands stay no-mutation navigation entries.",
        "Command registry coverage: new project memory, knowledge release, unified home, and navigation review routes are represented once.",
        "Command registry coverage: no route is executed from this page and no command runs from navigation review.",
      ],
      duplicateOverlapRisks: [
        "Duplicate/overlap risks: route hrefs must remain unique.",
        "Duplicate/overlap risks: shortLabel values must remain unique.",
        "Duplicate/overlap risks: similar release and review surfaces need plain labels so novice operators can choose the right next route.",
      ],
      noviceNavigationPolicy: [
        "Novice navigation policy: use plain-English labels, fewer primary choices, and clear review-only language.",
        "Novice navigation policy: advanced details stay collapsed or secondary.",
        "Novice navigation policy: route changes require review before removal and navigation consolidation does not remove route coverage.",
      ],
      protectedRoutes: [
        "Protected routes: /local-project-snapshot-review.",
        "Protected routes: /local-project-change-timeline.",
        "Protected routes: /local-project-decision-log.",
        "Protected routes: /local-project-runbook-export-review.",
        "Protected routes: /project-memory-promotion-boundary.",
        "Protected routes: /project-knowledge-release-candidate.",
        "Protected routes: /unified-workspace-home-review.",
        "Protected routes: /workspace-navigation-consolidation-review.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /stabilization can review final dashboard hardening posture after navigation consolidation is accepted.",
      blockedReasons: [
        "Navigation consolidation does not remove route coverage",
        "Route changes require review before removal",
        "No route is executed from this page",
      ],
      advancedNavigationDetails:
        "Advanced navigation details: this page does not remove route coverage, rename prior routes, execute routes, mutate registries silently, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, write runbooks, apply patches, delete files, call providers, call connectors, call web/search APIs, send prompt/file/project data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in localStorage, print process.env, display secrets, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildWorkspaceNavigationConsolidationReview({
      idHint: "blocked-route-removal-request",
      status: "blocked",
      consolidationReviewIdentity:
        "Consolidation review identity: workspace-navigation-consolidation-review-blocked-route-removal-request.",
      sourceUnifiedHome:
        "Source unified home: blocked when a request skips /unified-workspace-home-review or asks to remove route coverage without review.",
      routeGroupSummary: [
        "Route group summary: blocked if any route group would lose route coverage silently.",
      ],
      commandRegistryCoverage: [
        "Command registry coverage: blocked if command entries would be removed, duplicated, or turned into execution commands.",
      ],
      duplicateOverlapRisks: [
        "Duplicate/overlap risks: blocked if route hrefs or shortLabel values duplicate existing entries.",
      ],
      noviceNavigationPolicy: [
        "Novice navigation policy: blocked if labels become ambiguous, menus duplicate, or advanced raw registry data appears above the fold.",
      ],
      protectedRoutes: [
        "Protected routes: prior route entries stay available until reviewed removal is accepted.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /unified-workspace-home-review reviews the workspace posture before navigation changes continue.",
      blockedReasons: [
        "Route removal request is unreviewed",
        "Navigation consolidation does not remove route coverage",
        "Route changes require review before removal",
      ],
      advancedNavigationDetails:
        "Advanced navigation details: blocked navigation review cannot recover by mutating registries, executing routes, deleting route coverage, running commands, applying patches, reading files, or calling providers.",
    }),
  ];
}

export function buildWorkspaceNavigationConsolidationBoundary(): WorkspaceNavigationConsolidationBoundary {
  return {
    navigationConsolidationDoesNotRemoveRouteCoverage: true,
    routeChangesRequireReviewBeforeRemoval: true,
    routeExecutedFromPage: false,
    routeCoverageRemovalAllowed: false,
    silentRegistryMutationAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    runbookFileWriteAllowedFromUi: false,
    runbookExportAllowedFromUi: false,
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
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeWorkspaceNavigationConsolidationReview(
  model: Pick<WorkspaceNavigationConsolidationReviewModel, "reviews">
): string {
  return `Workspace navigation consolidation review prepares ${model.reviews.length} reviewed navigation posture(s). Navigation consolidation does not remove route coverage, route changes require review before removal, and no route is executed from this page.`;
}

export function buildWorkspaceNavigationConsolidationReviewModel(): WorkspaceNavigationConsolidationReviewModel {
  const reviews = buildWorkspaceNavigationConsolidationReviews();
  const model: WorkspaceNavigationConsolidationReviewModel = {
    title: "Workspace navigation consolidation review",
    summary: "",
    reviews,
    boundary: buildWorkspaceNavigationConsolidationBoundary(),
    navigationLanguage: [...WORKSPACE_NAVIGATION_CONSOLIDATION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Workspace navigation consolidation review",
      "Navigation consolidation does not remove route coverage",
      "Route changes require review before removal",
      "No route is executed from this page",
      "Consolidation review identity",
      "Source unified home",
      "Route group summary",
      "Command registry coverage",
      "Duplicate/overlap risks",
      "Novice navigation policy",
      "Protected routes",
      "Next recommended route",
      "Blocked reasons",
      "Advanced navigation details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeWorkspaceNavigationConsolidationReview(model) };
}
