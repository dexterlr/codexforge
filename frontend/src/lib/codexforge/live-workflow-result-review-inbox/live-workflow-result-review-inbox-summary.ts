import type {
  LiveWorkflowResultReviewInbox,
  LiveWorkflowResultReviewInboxBoundary,
  LiveWorkflowResultReviewInboxModel,
} from "./live-workflow-result-review-inbox-types";
import { buildLiveWorkflowResultReviewInboxStableKey } from "./live-workflow-result-review-inbox-types";

export const LIVE_WORKFLOW_RESULT_REVIEW_INBOX_LANGUAGE = [
  "Live workflow result review inbox",
  "Live workflow result review inbox does not store live outputs",
  "Live workflow results require operator review before use",
  "Unsafe results remain blocked",
  "Result review groups",
  "Acceptance rejection checklist",
] as const;

export function buildLiveWorkflowResultReviewInbox(
  input: Omit<LiveWorkflowResultReviewInbox, "id"> & { idHint: string }
): LiveWorkflowResultReviewInbox {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowResultReviewInboxStableKey("live-workflow-result-review-inbox", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowResultReviewInboxReviews(): LiveWorkflowResultReviewInbox[] {
  return [
    buildLiveWorkflowResultReviewInbox({
      idHint: "review-only-live-result-inbox",
      status: "ready-for-review",
      liveWorkflowResultReviewIdentity:
        "Live workflow result review identity: live-workflow-result-review-inbox-review-only-live-result-inbox.",
      resultReviewGroups: [
        "Result review groups: successful result summaries, partial result summaries, blocked result notes, privacy notes, and follow-up review items.",
        "Result review groups: live workflow result review inbox does not store live outputs.",
      ],
      acceptanceRejectionChecklist: [
        "Acceptance rejection checklist: accept only when the operator confirms source, safety, privacy, accuracy, and intended use.",
        "Acceptance rejection checklist: live workflow results require operator review before use.",
      ],
      redactionPrivacyRules: [
        "Redaction privacy rules: redact private live content, hide secrets, and keep unsafe results blocked.",
        "Redaction privacy rules: unsafe results remain blocked.",
      ],
      deniedResultActions: [
        "Denied result actions: store live outputs, ingest results, send prompts, call providers, fetch connector data, write files, persist approvals, or auto-promote memory.",
      ],
      blockedResultRisks: [
        "Blocked result risks: unsafe result reuse, private content exposure, output persistence, result auto-ingestion, provider output storage, and memory mutation.",
      ],
      feedbackRoute: "Feedback route: /live-workflow-operator-feedback-review reviews operator feedback without auto-ingesting it.",
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate reviews readiness without going live.",
      nextRecommendedAction:
        "Next recommended action: reject unsafe results, keep live outputs unstored, and send reviewed notes to operator feedback review.",
      advancedResultDetails:
        "Advanced result details: live workflow result review inbox is review-only. Live workflow result review inbox does not store live outputs, live workflow results require operator review before use, and unsafe results remain blocked. It does not ingest results, store outputs, call providers, call local models, call connectors, create automations, mutate files, mutate memory, or persist approval decisions.",
    }),
    buildLiveWorkflowResultReviewInbox({
      idHint: "blocked-unsafe-result",
      status: "blocked",
      liveWorkflowResultReviewIdentity:
        "Live workflow result review identity: live-workflow-result-review-inbox-blocked-unsafe-result.",
      resultReviewGroups: [
        "Result review groups: blocked when results are unsafe, unredacted, uncited, or unreviewed.",
      ],
      acceptanceRejectionChecklist: [
        "Acceptance rejection checklist: blocked until the operator rejects, redacts, or explicitly approves safe use outside this page.",
      ],
      redactionPrivacyRules: [
        "Redaction privacy rules: unsafe results remain blocked and private content stays redacted.",
      ],
      deniedResultActions: [
        "Denied result actions: result ingestion, output storage, provider send, file write, memory mutation, and approval persistence remain blocked.",
      ],
      blockedResultRisks: [
        "Blocked result risks: unsafe result shortcut, hidden output persistence, and unreviewed private content.",
      ],
      feedbackRoute: "Feedback route: /live-workflow-operator-feedback-review remains review-only.",
      releaseCandidateRoute: "Release candidate route: /controlled-live-workflow-release-candidate remains blocked until unsafe results are resolved.",
      nextRecommendedAction:
        "Next recommended action: keep unsafe results blocked and require operator review before any use.",
      advancedResultDetails:
        "Advanced result details: blocked result review cannot recover by storing outputs, ingesting results, calling providers, mutating files, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowResultReviewInboxBoundary(): LiveWorkflowResultReviewInboxBoundary {
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

export function summarizeLiveWorkflowResultReviewInbox(
  model: Pick<LiveWorkflowResultReviewInboxModel, "reviews">
): string {
  return `Live workflow result review inbox reviews live workflow results before use without storing live outputs across ${model.reviews.length} result review item(s). Live workflow result review inbox does not store live outputs, live workflow results require operator review before use, and unsafe results remain blocked.`;
}

export function buildLiveWorkflowResultReviewInboxModel(): LiveWorkflowResultReviewInboxModel {
  const reviews = buildLiveWorkflowResultReviewInboxReviews();
  const model: LiveWorkflowResultReviewInboxModel = {
    title: "Live workflow result review inbox",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowResultReviewInboxBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_RESULT_REVIEW_INBOX_LANGUAGE],
    advancedDetails: [
      "Live workflow result review inbox",
      "Live workflow result review inbox does not store live outputs",
      "Live workflow results require operator review before use",
      "Unsafe results remain blocked",
      "Result review groups",
      "Acceptance rejection checklist",
      "live workflow result review identity",
      "live workflow result review identity",
      "Result review groups",
      "Acceptance rejection checklist",
      "redaction privacy rules",
      "denied result actions",
      "blocked result risks",
      "feedback route",
      "release candidate route",
      "next recommended action",
      "advanced result details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowResultReviewInbox(model) };
}
