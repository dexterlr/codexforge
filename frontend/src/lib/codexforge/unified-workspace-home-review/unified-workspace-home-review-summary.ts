import type {
  UnifiedWorkspaceHomeReview,
  UnifiedWorkspaceHomeReviewBoundary,
  UnifiedWorkspaceHomeReviewModel,
} from "./unified-workspace-home-review-types";
import { buildUnifiedWorkspaceHomeReviewStableKey } from "./unified-workspace-home-review-types";

export const UNIFIED_WORKSPACE_HOME_REVIEW_LANGUAGE = [
  "Unified workspace home review",
  "Unified workspace does not execute actions",
  "All execution remains behind explicit approval gates",
  "This page is a review surface not an automation surface",
  "Covered loops summary",
  "Navigation consolidation route",
] as const;

export function buildUnifiedWorkspaceHomeReview(
  input: Omit<UnifiedWorkspaceHomeReview, "id"> & { idHint: string }
): UnifiedWorkspaceHomeReview {
  const { idHint, ...review } = input;
  return {
    id: buildUnifiedWorkspaceHomeReviewStableKey(
      "unified-workspace-home-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildUnifiedWorkspaceHomeReviews(): UnifiedWorkspaceHomeReview[] {
  return [
    buildUnifiedWorkspaceHomeReview({
      idHint: "review-only-operator-home-loop",
      status: "ready-for-review",
      unifiedHomeIdentity:
        "Unified home identity: unified-workspace-home-review-review-only-operator-home-loop.",
      coveredLoopsSummary: [
        "Covered loops summary: coding loop, provider loop, creative/local bridge loop, extension loop, research loop, connector loop, automation loop, and project knowledge loop.",
        "Covered loops summary: this home review summarizes routes and readiness; it does not execute actions or mutate workspace state.",
      ],
      codingLoopStatus:
        "Coding loop status: safe coding routes remain approval-gated through preview, apply review, validation planning, result capture, and recovery.",
      providerLoopStatus:
        "Provider loop status: provider readiness remains review-only unless a separate live-test approval gate accepts the request.",
      creativeLocalBridgeStatus:
        "Creative/local bridge status: local creative and bridge routes remain preview-only or explicitly approval-gated; no media generation or local job execution starts here.",
      extensionLoopStatus:
        "Extension loop status: extension architecture, manifest, permission, sandbox, and registry release surfaces remain review-only with no extension runtime executor.",
      researchLoopStatus:
        "Research loop status: research workspace release remains review-only, with no web/search/provider requests or source refresh from this page.",
      connectorLoopStatus:
        "Connector loop status: connector release remains approval-gated, with no connector API request, OAuth request, sync, email read, calendar read, or contact read from this page.",
      automationLoopStatus:
        "Automation loop status: automation release remains review-only; reminders, schedules, watches, notifications, polling, and background jobs are not created.",
      projectKnowledgeLoopStatus:
        "Project knowledge loop status: snapshot, timeline, decision log, runbook export, memory boundary, and knowledge release are reviewed before use and do not promote memory automatically.",
      navigationConsolidationRoute:
        "Navigation consolidation route: /workspace-navigation-consolidation-review reviews route grouping, density, and command registry coverage before any route changes.",
      blockedReasons: [
        "Unified workspace does not execute actions",
        "All execution remains behind explicit approval gates",
        "This page is a review surface not an automation surface",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: this page does not execute actions, run commands, run shell commands, run git commands, run tests, scan arbitrary local projects, browse local files, crawl paths, read files, open files, write files, export files, write runbooks, apply patches, delete files, call providers, call connectors, call web/search APIs, send prompt/file/project data without approval, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildUnifiedWorkspaceHomeReview({
      idHint: "blocked-execution-request",
      status: "blocked",
      unifiedHomeIdentity:
        "Unified home identity: unified-workspace-home-review-blocked-execution-request.",
      coveredLoopsSummary: [
        "Covered loops summary: blocked if a home page action would execute, mutate files, call providers, call connectors, promote memory, or start automation.",
      ],
      codingLoopStatus:
        "Coding loop status: blocked if patch application, validation execution, or git command execution is implied from the home page.",
      providerLoopStatus:
        "Provider loop status: blocked if provider calls, token spend, retries, or source sending are implied without approval.",
      creativeLocalBridgeStatus:
        "Creative/local bridge status: blocked if local job execution, ComfyUI workflow run, media generation, queue execution, or hardware/system command is implied.",
      extensionLoopStatus:
        "Extension loop status: blocked if extension installation, runtime execution, plugin execution, tool execution, agent execution, or MCP runtime creation is implied.",
      researchLoopStatus:
        "Research loop status: blocked if web browsing, search calls, source fetch, source refresh, citation finalization, or report export is implied.",
      connectorLoopStatus:
        "Connector loop status: blocked if OAuth, connector authorization, connector sync, connector API calls, email reads, calendar reads, or contact reads are implied.",
      automationLoopStatus:
        "Automation loop status: blocked if reminder creation, scheduling, watch activation, notification sending, polling, or background work is implied.",
      projectKnowledgeLoopStatus:
        "Project knowledge loop status: blocked if project files would be read, runbooks exported, or memory promoted automatically.",
      navigationConsolidationRoute:
        "Navigation consolidation route: /workspace-navigation-consolidation-review reviews navigation before any route grouping or removal decision.",
      blockedReasons: [
        "Execution request is outside this review surface",
        "All execution remains behind explicit approval gates",
        "This page is a review surface not an automation surface",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: blocked home review cannot recover by executing actions, running commands, reading files, calling providers, calling connectors, starting automations, promoting memory, mutating Brain graph, calling appendEvent, or calling saveBrainGraph.",
    }),
  ];
}

export function buildUnifiedWorkspaceHomeReviewBoundary(): UnifiedWorkspaceHomeReviewBoundary {
  return {
    unifiedWorkspaceDoesNotExecuteActions: true,
    allExecutionBehindExplicitApprovalGates: true,
    reviewSurfaceNotAutomationSurface: true,
    actionsExecutedFromUi: false,
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

export function summarizeUnifiedWorkspaceHomeReview(
  model: Pick<UnifiedWorkspaceHomeReviewModel, "reviews">
): string {
  return `Unified workspace home review prepares ${model.reviews.length} reviewed home posture(s). Unified workspace does not execute actions, all execution remains behind explicit approval gates, and this page is a review surface not an automation surface.`;
}

export function buildUnifiedWorkspaceHomeReviewModel(): UnifiedWorkspaceHomeReviewModel {
  const reviews = buildUnifiedWorkspaceHomeReviews();
  const model: UnifiedWorkspaceHomeReviewModel = {
    title: "Unified workspace home review",
    summary: "",
    reviews,
    boundary: buildUnifiedWorkspaceHomeReviewBoundary(),
    workspaceLanguage: [...UNIFIED_WORKSPACE_HOME_REVIEW_LANGUAGE],
    advancedDetails: [
      "Unified workspace home review",
      "Unified workspace does not execute actions",
      "All execution remains behind explicit approval gates",
      "This page is a review surface not an automation surface",
      "Unified home identity",
      "Covered loops summary",
      "Coding loop status",
      "Provider loop status",
      "Creative/local bridge status",
      "Extension loop status",
      "Research loop status",
      "Connector loop status",
      "Automation loop status",
      "Project knowledge loop status",
      "Navigation consolidation route",
      "Blocked reasons",
      "Advanced workspace details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeUnifiedWorkspaceHomeReview(model) };
}
