import type {
  ExpertModeFastPathReview,
  ExpertModeFastPathReviewBoundary,
  ExpertModeFastPathReviewModel,
} from "./expert-mode-fast-path-review-types";
import { buildExpertModeFastPathReviewStableKey } from "./expert-mode-fast-path-review-types";

export const EXPERT_MODE_FAST_PATH_REVIEW_LANGUAGE = [
  "Expert mode fast path review",
  "Expert fast path still requires explicit approval",
  "Safety boundaries cannot be bypassed",
  "No fast path action runs from this page",
  "Eligible expert shortcuts",
  "Audit trail expectations",
] as const;

export function buildExpertModeFastPathReview(
  input: Omit<ExpertModeFastPathReview, "id"> & { idHint: string }
): ExpertModeFastPathReview {
  const { idHint, ...fastPath } = input;
  return {
    id: buildExpertModeFastPathReviewStableKey("expert-mode-fast-path-review", idHint, input.status),
    ...fastPath,
  };
}

export function buildExpertModeFastPathReviews(): ExpertModeFastPathReview[] {
  return [
    buildExpertModeFastPathReview({
      idHint: "daily-power-review",
      status: "ready-for-review",
      expertFastPathIdentity:
        "Expert fast path identity: expert-mode-fast-path-review-daily-power-review.",
      eligibleExpertShortcuts: [
        "Eligible expert shortcuts: jump from daily home to safety matrix, approval queue, result history, or recovery playbook when the operator already knows the context.",
        "Eligible expert shortcuts: skip repeated novice explanations only after the same approval checkpoints remain visible.",
      ],
      requiredApprovalGates: [
        "Required approval gates: expert fast path still requires explicit approval for execution, provider, connector, local file, automation, recovery, rollback, and memory boundaries.",
        "Required approval gates: approval automation is not available from expert mode.",
      ],
      skippedClutterSummary: [
        "Skipped clutter summary: expert mode compresses explanatory copy but does not hide blocked reasons, validation evidence requirements, safety matrix gaps, or audit trail expectations.",
      ],
      boundariesThatCannotBeBypassed: [
        "Boundaries that cannot be bypassed: safety boundaries cannot be bypassed.",
        "Boundaries that cannot be bypassed: no action execution from UI, no workflow execution, no provider API calls, no connector API calls, no local bridge endpoint calls, no file mutation, no memory promotion, and no automation creation.",
      ],
      auditTrailExpectations: [
        "Audit trail expectations: expert review should leave clear reviewed route, approval status, validation evidence, blocked reasons, and next recommended action.",
        "Audit trail expectations: no fast path action runs from this page, so audit expectations describe what to review before using a future approved path.",
      ],
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish remains available when plain-English guidance is preferred.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home remains the safe cockpit starting point.",
      nextRecommendedAction:
        "Next recommended action: use the fast path only to review the next route, then stop at the explicit approval gate.",
      advancedExpertDetails:
        "Advanced expert details: expert mode fast path still requires explicit approval, safety boundaries cannot be bypassed, and no fast path action runs from this page. It does not approve actions, execute actions, run workflows, run recovery, run rollback, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector data without approval, scan arbitrary projects, browse files, crawl paths, read files, open files, run git commands, run shell commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in localStorage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildExpertModeFastPathReview({
      idHint: "blocked-bypass-attempt",
      status: "blocked",
      expertFastPathIdentity:
        "Expert fast path identity: expert-mode-fast-path-review-blocked-bypass-attempt.",
      eligibleExpertShortcuts: [
        "Eligible expert shortcuts: no expert shortcut is eligible when an unresolved safety gap is present.",
      ],
      requiredApprovalGates: [
        "Required approval gates: explicit approval remains required and cannot be implied by expert mode.",
      ],
      skippedClutterSummary: [
        "Skipped clutter summary: blocked reasons are not clutter and remain visible.",
      ],
      boundariesThatCannotBeBypassed: [
        "Boundaries that cannot be bypassed: safety boundaries cannot be bypassed and blocked gaps stay blocked.",
      ],
      auditTrailExpectations: [
        "Audit trail expectations: record the blocked reason and return to safety matrix or novice mode for review.",
      ],
      noviceModeRoute:
        "Novice mode route: /novice-mode-guided-flow-polish explains blocked actions in plain English.",
      dailyHomeRoute:
        "Daily home route: /daily-operator-home restores the standard daily review sequence.",
      nextRecommendedAction:
        "Next recommended action: stop the fast path and resolve the blocked safety boundary.",
      advancedExpertDetails:
        "Advanced expert details: blocked expert fast path cannot approve, execute, recover, retry, roll back, call APIs, mutate files, mutate memory, schedule work, start background jobs, or bypass safety boundaries.",
    }),
  ];
}

export function buildExpertModeFastPathReviewBoundary(): ExpertModeFastPathReviewBoundary {
  return {
    expertFastPathReviewOnly: true,
    expertFastPathStillRequiresExplicitApproval: true,
    safetyBoundariesCannotBeBypassed: true,
    noFastPathActionRunsFromThisPage: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    approvalAutomationAllowedFromUi: false,
    recoveryAutomationAllowedFromUi: false,
    rollbackExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localToolLaunchAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeExpertModeFastPathReview(
  model: Pick<ExpertModeFastPathReviewModel, "fastPaths">
): string {
  return `Expert mode fast path review prepares ${model.fastPaths.length} expert fast path posture(s). Expert fast path still requires explicit approval, safety boundaries cannot be bypassed, and no fast path action runs from this page.`;
}

export function buildExpertModeFastPathReviewModel(): ExpertModeFastPathReviewModel {
  const fastPaths = buildExpertModeFastPathReviews();
  const model: ExpertModeFastPathReviewModel = {
    title: "Expert mode fast path review",
    summary: "",
    fastPaths,
    boundary: buildExpertModeFastPathReviewBoundary(),
    expertLanguage: [...EXPERT_MODE_FAST_PATH_REVIEW_LANGUAGE],
    advancedDetails: [
      "Expert mode fast path review",
      "Expert fast path identity",
      "Eligible expert shortcuts",
      "Required approval gates",
      "Skipped clutter summary",
      "Boundaries that cannot be bypassed",
      "Audit trail expectations",
      "Novice mode route",
      "Daily home route",
      "Next recommended action",
      "Expert fast path still requires explicit approval",
      "Safety boundaries cannot be bypassed",
      "No fast path action runs from this page",
      "advanced expert details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeExpertModeFastPathReview(model) };
}
