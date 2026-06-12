import type {
  ControlledLiveWorkflowReleaseCandidate,
  ControlledLiveWorkflowReleaseCandidateBoundary,
  ControlledLiveWorkflowReleaseCandidateModel,
} from "./controlled-live-workflow-release-candidate-types";
import { buildControlledLiveWorkflowReleaseCandidateStableKey } from "./controlled-live-workflow-release-candidate-types";

export const CONTROLLED_LIVE_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled live workflow release candidate",
  "Controlled live workflow release candidate does not go live",
  "Controlled release requires explicit operator approval",
  "Unresolved release blockers stay blocked",
  "Evidence status",
  "Approval gate status",
] as const;

export function buildControlledLiveWorkflowReleaseCandidate(
  input: Omit<ControlledLiveWorkflowReleaseCandidate, "id"> & { idHint: string }
): ControlledLiveWorkflowReleaseCandidate {
  const { idHint, ...review } = input;
  return {
    id: buildControlledLiveWorkflowReleaseCandidateStableKey("controlled-live-workflow-release-candidate", idHint, input.status),
    ...review,
  };
}

export function buildControlledLiveWorkflowReleaseCandidateReviews(): ControlledLiveWorkflowReleaseCandidate[] {
  return [
    buildControlledLiveWorkflowReleaseCandidate({
      idHint: "review-only-controlled-release-candidate",
      status: "ready-for-review",
      controlledLiveWorkflowCandidateIdentity:
        "Controlled live workflow candidate identity: controlled-live-workflow-release-candidate-review-only-controlled-release-candidate.",
      evidenceStatus: [
        "Evidence status: evidence capture is redacted, cited, and still review-only until the operator approves use.",
      ],
      resultReviewStatus: [
        "Result review status: live outputs are not stored and unsafe results remain blocked.",
      ],
      feedbackStatus: [
        "Feedback status: operator feedback is reviewed without auto-ingestion or memory promotion.",
      ],
      approvalGateStatus: [
        "Approval gate status: controlled release requires explicit operator approval and no approval is granted by this page.",
      ],
      deniedReleasePaths: [
        "Denied release paths: go live, execute workflows, call providers, call local models, call connectors, create automations, persist approvals, store outputs, mutate files, or mutate memory.",
      ],
      unresolvedReleaseBlockers: [
        "Unresolved release blockers: unreviewed evidence, unsafe result, unsafe feedback shortcut, missing approval gate, and regression gap.",
      ],
      replayRoute: "Replay route: /first-controlled-live-workflow-replay previews replay without rerunning live actions.",
      regressionMatrixRoute: "Regression matrix route: /live-workflow-regression-matrix reviews coverage without running tests.",
      nextRecommendedAction:
        "Next recommended action: keep the release candidate review-only, resolve blockers, and require explicit operator approval before any live release outside this page.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: controlled live workflow release candidate is review-only. Controlled live workflow release candidate does not go live, controlled release requires explicit operator approval, and unresolved release blockers stay blocked. It does not execute workflows, call providers, call local models, call connectors, create automations, store outputs, mutate files, mutate memory, or persist approvals.",
    }),
    buildControlledLiveWorkflowReleaseCandidate({
      idHint: "blocked-unresolved-release-blocker",
      status: "blocked",
      controlledLiveWorkflowCandidateIdentity:
        "Controlled live workflow candidate identity: controlled-live-workflow-release-candidate-blocked-unresolved-release-blocker.",
      evidenceStatus: [
        "Evidence status: blocked because evidence review is incomplete.",
      ],
      resultReviewStatus: [
        "Result review status: blocked because unsafe results remain blocked.",
      ],
      feedbackStatus: [
        "Feedback status: blocked because unsafe feedback shortcuts stay blocked.",
      ],
      approvalGateStatus: [
        "Approval gate status: blocked because controlled release requires explicit operator approval.",
      ],
      deniedReleasePaths: [
        "Denied release paths: go-live, workflow execution, automation creation, output storage, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedReleaseBlockers: [
        "Unresolved release blockers: unresolved release blockers stay blocked.",
      ],
      replayRoute: "Replay route: /first-controlled-live-workflow-replay remains review-only.",
      regressionMatrixRoute: "Regression matrix route: /live-workflow-regression-matrix remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep release blocked until evidence, results, feedback, and approval gates are reviewed.",
      advancedReleaseCandidateDetails:
        "Advanced release candidate details: blocked release candidate cannot recover by going live, executing workflows, creating automations, storing outputs, or mutating files.",
    }),
  ];
}

export function buildControlledLiveWorkflowReleaseCandidateBoundary(): ControlledLiveWorkflowReleaseCandidateBoundary {
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

export function summarizeControlledLiveWorkflowReleaseCandidate(
  model: Pick<ControlledLiveWorkflowReleaseCandidateModel, "reviews">
): string {
  return `Controlled live workflow release candidate summarizes first live workflow readiness without going live across ${model.reviews.length} release candidate review item(s). Controlled live workflow release candidate does not go live, controlled release requires explicit operator approval, and unresolved release blockers stay blocked.`;
}

export function buildControlledLiveWorkflowReleaseCandidateModel(): ControlledLiveWorkflowReleaseCandidateModel {
  const reviews = buildControlledLiveWorkflowReleaseCandidateReviews();
  const model: ControlledLiveWorkflowReleaseCandidateModel = {
    title: "Controlled live workflow release candidate",
    summary: "",
    reviews,
    boundary: buildControlledLiveWorkflowReleaseCandidateBoundary(),
    reviewLanguage: [...CONTROLLED_LIVE_WORKFLOW_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Controlled live workflow release candidate",
      "Controlled live workflow release candidate does not go live",
      "Controlled release requires explicit operator approval",
      "Unresolved release blockers stay blocked",
      "Evidence status",
      "Approval gate status",
      "controlled live workflow candidate identity",
      "controlled live workflow candidate identity",
      "Evidence status",
      "result review status",
      "feedback status",
      "Approval gate status",
      "denied release paths",
      "unresolved release blockers",
      "replay route",
      "regression matrix route",
      "next recommended action",
      "advanced release candidate details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeControlledLiveWorkflowReleaseCandidate(model) };
}
