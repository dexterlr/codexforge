import type {
  LiveWorkflowOperatorFeedbackReview,
  LiveWorkflowOperatorFeedbackReviewBoundary,
  LiveWorkflowOperatorFeedbackReviewModel,
} from "./live-workflow-operator-feedback-review-types";
import { buildLiveWorkflowOperatorFeedbackReviewStableKey } from "./live-workflow-operator-feedback-review-types";

export const LIVE_WORKFLOW_OPERATOR_FEEDBACK_REVIEW_LANGUAGE = [
  "Live workflow operator feedback review",
  "Live workflow operator feedback review does not auto-promote memory",
  "Operator feedback requires review before use",
  "Unsafe feedback shortcuts stay blocked",
  "Feedback groups",
  "Friction categories",
] as const;

export function buildLiveWorkflowOperatorFeedbackReview(
  input: Omit<LiveWorkflowOperatorFeedbackReview, "id"> & { idHint: string }
): LiveWorkflowOperatorFeedbackReview {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowOperatorFeedbackReviewStableKey("live-workflow-operator-feedback-review", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowOperatorFeedbackReviewReviews(): LiveWorkflowOperatorFeedbackReview[] {
  return [
    buildLiveWorkflowOperatorFeedbackReview({
      idHint: "review-only-operator-feedback",
      status: "ready-for-review",
      liveWorkflowFeedbackIdentity:
        "Live workflow feedback identity: live-workflow-operator-feedback-review-review-only-operator-feedback.",
      feedbackGroups: [
        "Feedback groups: operator friction, safety concerns, result clarity, evidence gaps, replay notes, and release-candidate questions.",
        "Feedback groups: live workflow operator feedback review does not auto-promote memory.",
      ],
      frictionCategories: [
        "Friction categories: unclear wording, missing approval gate, delayed evidence handoff, unsafe shortcut request, and incomplete recovery note.",
      ],
      safetyFeedbackChecklist: [
        "Safety feedback checklist: operator feedback requires review before use and unsafe feedback shortcuts stay blocked.",
        "Safety feedback checklist: feedback is never auto-ingested, written to files, or promoted into memory from this page.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: auto-ingest feedback, auto-promote memory, create tasks, write files, create automations, persist approvals, or mutate the Brain graph.",
      ],
      memoryPromotionBoundaryNotes: [
        "Memory promotion boundary notes: feedback can be reviewed as plain text only; memory promotion requires explicit operator approval outside this page.",
      ],
      blockedFeedbackRisks: [
        "Blocked feedback risks: unsafe shortcut, hidden task creation, automatic memory promotion, file write, and unreviewed safety override.",
      ],
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate reviews readiness without going live.",
      replayRoute: "Replay route: /first-controlled-live-workflow-replay previews replay without rerunning live actions.",
      nextRecommendedAction:
        "Next recommended action: keep feedback review-only, resolve unsafe shortcuts, and require operator approval before any memory use.",
      advancedFeedbackDetails:
        "Advanced feedback details: live workflow operator feedback review is review-only. Live workflow operator feedback review does not auto-promote memory, operator feedback requires review before use, and unsafe feedback shortcuts stay blocked. It does not auto-ingest feedback, mutate memory, write files, create tasks, create automations, call providers, call local models, or call connectors.",
    }),
    buildLiveWorkflowOperatorFeedbackReview({
      idHint: "blocked-feedback-shortcut",
      status: "blocked",
      liveWorkflowFeedbackIdentity:
        "Live workflow feedback identity: live-workflow-operator-feedback-review-blocked-feedback-shortcut.",
      feedbackGroups: [
        "Feedback groups: blocked when feedback asks to bypass review, persist decisions, promote memory, or create tasks automatically.",
      ],
      frictionCategories: [
        "Friction categories: unsafe shortcut, missing approval, unreviewed memory request, and hidden automation request.",
      ],
      safetyFeedbackChecklist: [
        "Safety feedback checklist: unsafe feedback shortcuts stay blocked.",
      ],
      deniedFeedbackActions: [
        "Denied feedback actions: feedback ingestion, memory promotion, task creation, file write, and automation creation remain blocked.",
      ],
      memoryPromotionBoundaryNotes: [
        "Memory promotion boundary notes: blocked feedback is not saved as memory automatically.",
      ],
      blockedFeedbackRisks: [
        "Blocked feedback risks: hidden memory mutation, unreviewed safety shortcut, and automatic task creation.",
      ],
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate remains blocked until unsafe feedback is resolved.",
      replayRoute: "Replay route: /first-controlled-live-workflow-replay remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep unsafe feedback blocked and require operator review before use.",
      advancedFeedbackDetails:
        "Advanced feedback details: blocked feedback cannot recover by auto-ingesting feedback, auto-promoting memory, writing files, creating tasks, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowOperatorFeedbackReviewBoundary(): LiveWorkflowOperatorFeedbackReviewBoundary {
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

export function summarizeLiveWorkflowOperatorFeedbackReview(
  model: Pick<LiveWorkflowOperatorFeedbackReviewModel, "reviews">
): string {
  return `Live workflow operator feedback review reviews operator feedback without auto-ingesting it or promoting memory across ${model.reviews.length} feedback review item(s). Live workflow operator feedback review does not auto-promote memory, operator feedback requires review before use, and unsafe feedback shortcuts stay blocked.`;
}

export function buildLiveWorkflowOperatorFeedbackReviewModel(): LiveWorkflowOperatorFeedbackReviewModel {
  const reviews = buildLiveWorkflowOperatorFeedbackReviewReviews();
  const model: LiveWorkflowOperatorFeedbackReviewModel = {
    title: "Live workflow operator feedback review",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowOperatorFeedbackReviewBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_OPERATOR_FEEDBACK_REVIEW_LANGUAGE],
    advancedDetails: [
      "Live workflow operator feedback review",
      "Live workflow operator feedback review does not auto-promote memory",
      "Operator feedback requires review before use",
      "Unsafe feedback shortcuts stay blocked",
      "Feedback groups",
      "Friction categories",
      "live workflow feedback identity",
      "live workflow feedback identity",
      "Feedback groups",
      "Friction categories",
      "safety feedback checklist",
      "denied feedback actions",
      "memory promotion boundary notes",
      "blocked feedback risks",
      "release candidate route",
      "replay route",
      "next recommended action",
      "advanced feedback details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowOperatorFeedbackReview(model) };
}
