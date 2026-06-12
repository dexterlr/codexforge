import type {
  LiveWorkflowFailurePatchReview,
  LiveWorkflowFailurePatchReviewBoundary,
  LiveWorkflowFailurePatchReviewModel,
} from "./live-workflow-failure-patch-review-types";
import { buildLiveWorkflowFailurePatchReviewStableKey } from "./live-workflow-failure-patch-review-types";

export const LIVE_WORKFLOW_FAILURE_PATCH_REVIEW_LANGUAGE = [
  "Live workflow failure patch review",
  "Live workflow failure patch review does not apply patches",
  "Candidate patches require explicit operator approval",
  "Unsafe patch shortcuts stay blocked",
  "Failure groups",
  "Candidate patch categories",
] as const;

export function buildLiveWorkflowFailurePatchReview(
  input: Omit<LiveWorkflowFailurePatchReview, "id"> & { idHint: string }
): LiveWorkflowFailurePatchReview {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowFailurePatchReviewStableKey("live-workflow-failure-patch-review", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowFailurePatchReviewReviews(): LiveWorkflowFailurePatchReview[] {
  return [
    buildLiveWorkflowFailurePatchReview({
      idHint: "review-only-failure-patch",
      status: "ready-for-review",
      liveWorkflowFailurePatchIdentity:
        "Live workflow failure patch identity: live-workflow-failure-patch-review-review-only-failure-patch.",
      failureGroups: [
        "Failure groups: approval gap, evidence gap, unsafe result, feedback shortcut, replay mismatch, regression gap, provider boundary, local boundary, connector boundary, and automation boundary.",
      ],
      candidatePatchCategories: [
        "Candidate patch categories: copy fix, checklist fix, guardrail note, route link correction, blocked-risk clarification, and test plan recommendation.",
      ],
      validationRequirements: [
        "Validation requirements: candidate patches require explicit operator approval and cannot be applied from this page.",
      ],
      deniedPatchActions: [
        "Denied patch actions: apply patches, write files, run commands, run tests, run builds, run smokes, mutate memory, or persist approval decisions.",
      ],
      rollbackChecklist: [
        "Rollback checklist: review rollback notes as text only; no rollback execution or recovery auto-trigger occurs here.",
      ],
      blockedPatchRisks: [
        "Blocked patch risks: unsafe patch shortcut, file mutation, shell execution, test execution, approval persistence, and memory mutation.",
      ],
      hardeningPassRoute: "Hardening pass route: /live-workflow-hardening-pass reviews hardening readiness without applying changes.",
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate reviews readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: keep candidate patches un-applied, review validation requirements, and require operator approval before any patch outside this page.",
      advancedPatchDetails:
        "Advanced patch details: live workflow failure patch review is review-only. Live workflow failure patch review does not apply patches, candidate patches require explicit operator approval, and unsafe patch shortcuts stay blocked. It does not write files, run commands, run tests, apply patches, call providers, call local models, call connectors, mutate memory, or persist approvals.",
    }),
    buildLiveWorkflowFailurePatchReview({
      idHint: "blocked-patch-shortcut",
      status: "blocked",
      liveWorkflowFailurePatchIdentity:
        "Live workflow failure patch identity: live-workflow-failure-patch-review-blocked-patch-shortcut.",
      failureGroups: [
        "Failure groups: blocked when a failure asks for automatic recovery, patch application, file write, or command execution.",
      ],
      candidatePatchCategories: [
        "Candidate patch categories: blocked when a candidate patch skips approval or validation.",
      ],
      validationRequirements: [
        "Validation requirements: blocked because candidate patches require explicit operator approval.",
      ],
      deniedPatchActions: [
        "Denied patch actions: patch application, file write, shell command, test execution, build execution, smoke execution, and memory mutation remain blocked.",
      ],
      rollbackChecklist: [
        "Rollback checklist: blocked rollback notes remain review-only and do not execute.",
      ],
      blockedPatchRisks: [
        "Blocked patch risks: unsafe patch shortcuts stay blocked.",
      ],
      hardeningPassRoute: "Hardening pass route: /live-workflow-hardening-pass remains review-only.",
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the candidate patch blocked until an operator approves it outside this page.",
      advancedPatchDetails:
        "Advanced patch details: blocked failure patch review cannot recover by applying patches, writing files, running commands, running tests, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowFailurePatchReviewBoundary(): LiveWorkflowFailurePatchReviewBoundary {
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

export function summarizeLiveWorkflowFailurePatchReview(
  model: Pick<LiveWorkflowFailurePatchReviewModel, "reviews">
): string {
  return `Live workflow failure patch review reviews failures and candidate patches without applying them across ${model.reviews.length} failure patch review item(s). Live workflow failure patch review does not apply patches, candidate patches require explicit operator approval, and unsafe patch shortcuts stay blocked.`;
}

export function buildLiveWorkflowFailurePatchReviewModel(): LiveWorkflowFailurePatchReviewModel {
  const reviews = buildLiveWorkflowFailurePatchReviewReviews();
  const model: LiveWorkflowFailurePatchReviewModel = {
    title: "Live workflow failure patch review",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowFailurePatchReviewBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_FAILURE_PATCH_REVIEW_LANGUAGE],
    advancedDetails: [
      "Live workflow failure patch review",
      "Live workflow failure patch review does not apply patches",
      "Candidate patches require explicit operator approval",
      "Unsafe patch shortcuts stay blocked",
      "Failure groups",
      "Candidate patch categories",
      "live workflow failure patch identity",
      "live workflow failure patch identity",
      "Failure groups",
      "Candidate patch categories",
      "validation requirements",
      "denied patch actions",
      "rollback checklist",
      "blocked patch risks",
      "hardening pass route",
      "release candidate route",
      "next recommended action",
      "advanced patch details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowFailurePatchReview(model) };
}
