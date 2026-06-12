import type {
  FirstControlledLiveWorkflowReplay,
  FirstControlledLiveWorkflowReplayBoundary,
  FirstControlledLiveWorkflowReplayModel,
} from "./first-controlled-live-workflow-replay-types";
import { buildFirstControlledLiveWorkflowReplayStableKey } from "./first-controlled-live-workflow-replay-types";

export const FIRST_CONTROLLED_LIVE_WORKFLOW_REPLAY_LANGUAGE = [
  "First controlled live workflow replay",
  "Controlled live workflow replay does not rerun live actions",
  "Replay review requires operator approval before reuse",
  "Unsafe replay shortcuts stay blocked",
  "Replay stages",
  "Expected actual comparison groups",
] as const;

export function buildFirstControlledLiveWorkflowReplay(
  input: Omit<FirstControlledLiveWorkflowReplay, "id"> & { idHint: string }
): FirstControlledLiveWorkflowReplay {
  const { idHint, ...review } = input;
  return {
    id: buildFirstControlledLiveWorkflowReplayStableKey("first-controlled-live-workflow-replay", idHint, input.status),
    ...review,
  };
}

export function buildFirstControlledLiveWorkflowReplayReviews(): FirstControlledLiveWorkflowReplay[] {
  return [
    buildFirstControlledLiveWorkflowReplay({
      idHint: "review-only-controlled-replay",
      status: "ready-for-review",
      liveWorkflowReplayIdentity:
        "Live workflow replay identity: first-controlled-live-workflow-replay-review-only-controlled-replay.",
      replayStages: [
        "Replay stages: capture reviewed notes, compare expected and actual outcomes, review evidence, review blocked risks, and stop before rerun.",
        "Replay stages: controlled live workflow replay does not rerun live actions.",
      ],
      expectedActualComparisonGroups: [
        "Expected actual comparison groups: approval gate behavior, evidence handling, result handling, operator feedback, denied paths, and stop conditions.",
      ],
      validationEvidenceChecklist: [
        "Validation evidence checklist: replay review requires operator approval before reuse and evidence remains redacted.",
      ],
      deniedReplayActions: [
        "Denied replay actions: rerun workflow, execute live action, call providers, call local models, call connectors, store outputs, mutate files, mutate memory, or persist approvals.",
      ],
      blockedReplayRisks: [
        "Blocked replay risks: unsafe replay shortcut, hidden live action, output storage, result ingestion, evidence ingestion, and missing operator approval.",
      ],
      regressionMatrixRoute: "Regression matrix route: /live-workflow-regression-matrix reviews coverage without running tests.",
      failurePatchRoute: "Failure patch route: /live-workflow-failure-patch-review reviews candidate patches without applying them.",
      nextRecommendedAction:
        "Next recommended action: keep replay review-only, compare expected and actual outcomes, and require operator approval before reuse.",
      advancedReplayDetails:
        "Advanced replay details: first controlled live workflow replay is review-only. Controlled live workflow replay does not rerun live actions, replay review requires operator approval before reuse, and unsafe replay shortcuts stay blocked. It does not rerun workflows, call providers, call local models, call connectors, store outputs, mutate files, mutate memory, or persist approvals.",
    }),
    buildFirstControlledLiveWorkflowReplay({
      idHint: "blocked-replay-shortcut",
      status: "blocked",
      liveWorkflowReplayIdentity:
        "Live workflow replay identity: first-controlled-live-workflow-replay-blocked-replay-shortcut.",
      replayStages: [
        "Replay stages: blocked when a stage asks to rerun a workflow or execute a live action.",
      ],
      expectedActualComparisonGroups: [
        "Expected actual comparison groups: blocked until expected and actual outcomes are reviewed as text only.",
      ],
      validationEvidenceChecklist: [
        "Validation evidence checklist: blocked because replay review requires operator approval before reuse.",
      ],
      deniedReplayActions: [
        "Denied replay actions: rerun workflow, execute live action, provider call, connector call, output storage, file mutation, and memory mutation remain blocked.",
      ],
      blockedReplayRisks: [
        "Blocked replay risks: unsafe replay shortcuts stay blocked.",
      ],
      regressionMatrixRoute: "Regression matrix route: /live-workflow-regression-matrix remains review-only.",
      failurePatchRoute: "Failure patch route: /live-workflow-failure-patch-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep replay blocked until the operator approves reuse outside this page.",
      advancedReplayDetails:
        "Advanced replay details: blocked replay cannot recover by rerunning workflows, executing live actions, calling providers, storing outputs, or mutating memory.",
    }),
  ];
}

export function buildFirstControlledLiveWorkflowReplayBoundary(): FirstControlledLiveWorkflowReplayBoundary {
  return {
    reviewOnly: true,
    approvalRequired: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    liveWorkflowLaunchAllowedFromUi: false,
    liveActionExecutionAllowedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    autoApprovalAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    evidenceAutoIngestionAllowedFromUi: false,
    resultAutoIngestionAllowedFromUi: false,
    feedbackAutoIngestionAllowedFromUi: false,
    recoveryAutoTriggerAllowedFromUi: false,
    replayExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    hardeningApplyAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    tokenStorageAllowed: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    outputStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFirstControlledLiveWorkflowReplay(
  model: Pick<FirstControlledLiveWorkflowReplayModel, "reviews">
): string {
  return `First controlled live workflow replay previews replay without rerunning anything across ${model.reviews.length} replay review item(s). Controlled live workflow replay does not rerun live actions, replay review requires operator approval before reuse, and unsafe replay shortcuts stay blocked.`;
}

export function buildFirstControlledLiveWorkflowReplayModel(): FirstControlledLiveWorkflowReplayModel {
  const reviews = buildFirstControlledLiveWorkflowReplayReviews();
  const model: FirstControlledLiveWorkflowReplayModel = {
    title: "First controlled live workflow replay",
    summary: "",
    reviews,
    boundary: buildFirstControlledLiveWorkflowReplayBoundary(),
    reviewLanguage: [...FIRST_CONTROLLED_LIVE_WORKFLOW_REPLAY_LANGUAGE],
    advancedDetails: [
      "First controlled live workflow replay",
      "Controlled live workflow replay does not rerun live actions",
      "Replay review requires operator approval before reuse",
      "Unsafe replay shortcuts stay blocked",
      "Replay stages",
      "Expected actual comparison groups",
      "live workflow replay identity",
      "live workflow replay identity",
      "Replay stages",
      "Expected actual comparison groups",
      "validation evidence checklist",
      "denied replay actions",
      "blocked replay risks",
      "regression matrix route",
      "failure patch route",
      "next recommended action",
      "advanced replay details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstControlledLiveWorkflowReplay(model) };
}
