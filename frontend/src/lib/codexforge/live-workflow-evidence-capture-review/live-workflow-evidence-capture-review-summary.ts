import type {
  LiveWorkflowEvidenceCaptureReview,
  LiveWorkflowEvidenceCaptureReviewBoundary,
  LiveWorkflowEvidenceCaptureReviewModel,
} from "./live-workflow-evidence-capture-review-types";
import { buildLiveWorkflowEvidenceCaptureReviewStableKey } from "./live-workflow-evidence-capture-review-types";

export const LIVE_WORKFLOW_EVIDENCE_CAPTURE_REVIEW_LANGUAGE = [
  "Live workflow evidence capture review",
  "Live workflow evidence capture review does not ingest evidence automatically",
  "Live workflow evidence requires operator review before use",
  "Private live evidence stays redacted",
  "Evidence capture groups",
  "Source citation checklist",
] as const;

export function buildLiveWorkflowEvidenceCaptureReview(
  input: Omit<LiveWorkflowEvidenceCaptureReview, "id"> & { idHint: string }
): LiveWorkflowEvidenceCaptureReview {
  const { idHint, ...review } = input;
  return {
    id: buildLiveWorkflowEvidenceCaptureReviewStableKey("live-workflow-evidence-capture-review", idHint, input.status),
    ...review,
  };
}

export function buildLiveWorkflowEvidenceCaptureReviewReviews(): LiveWorkflowEvidenceCaptureReview[] {
  return [
    buildLiveWorkflowEvidenceCaptureReview({
      idHint: "review-only-live-evidence-capture",
      status: "ready-for-review",
      liveWorkflowEvidenceCaptureIdentity:
        "Live workflow evidence capture identity: live-workflow-evidence-capture-review-review-only-live-evidence-capture.",
      evidenceCaptureGroups: [
        "Evidence capture groups: operator notes, redacted citations, result handoff references, approval gate notes, and failure observations are previewed as labels only.",
        "Evidence capture groups: live workflow evidence capture review does not ingest evidence automatically.",
      ],
      sourceCitationChecklist: [
        "Source citation checklist: every live evidence item needs a named source, citation label, operator reviewer, and privacy classification before use.",
        "Source citation checklist: live workflow evidence requires operator review before use.",
      ],
      redactionChecklist: [
        "Redaction checklist: private live evidence stays redacted, secrets stay hidden, and raw credentials are never displayed.",
        "Redaction checklist: copied evidence remains review-only and is not stored, exported, or ingested from this page.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: ingest evidence, store live outputs, send evidence to providers, fetch connector data, scan local projects, write files, mutate memory, or promote evidence automatically.",
        "Denied evidence actions: evidence shortcuts stay blocked until an operator approves use outside this page.",
      ],
      retentionBoundaryNotes: [
        "Retention boundary notes: live evidence retention is a review note only; this route does not persist approval decisions, outputs, credentials, or evidence payloads.",
        "Retention boundary notes: private live evidence stays redacted and requires manual retention review.",
      ],
      blockedEvidenceRisks: [
        "Blocked evidence risks: missing citation, unredacted private evidence, provider output storage, connector data persistence, memory promotion, file mutation, and route coverage removal.",
        "Blocked evidence risks: unresolved evidence risks keep the evidence review blocked.",
      ],
      resultReviewInboxRoute: "Result review inbox route: /live-workflow-result-review-inbox reviews live workflow results before use.",
      operatorFeedbackRoute: "Operator feedback route: /live-workflow-operator-feedback-review reviews operator feedback before use.",
      nextRecommendedAction:
        "Next recommended action: keep live evidence redacted, send reviewed items to the result review inbox, and require explicit operator approval before any use.",
      advancedEvidenceDetails:
        "Advanced evidence details: live workflow evidence capture review is review-only. Live workflow evidence capture review does not ingest evidence automatically, live workflow evidence requires operator review before use, and private live evidence stays redacted. It does not ingest evidence, store live outputs, call providers, call local models, call connectors, create automations, mutate files, mutate memory, auto-promote memory, or persist approval decisions.",
    }),
    buildLiveWorkflowEvidenceCaptureReview({
      idHint: "blocked-private-evidence-shortcut",
      status: "blocked",
      liveWorkflowEvidenceCaptureIdentity:
        "Live workflow evidence capture identity: live-workflow-evidence-capture-review-blocked-private-evidence-shortcut.",
      evidenceCaptureGroups: [
        "Evidence capture groups: blocked when evidence lacks source labels, citation review, privacy notes, or redaction confirmation.",
      ],
      sourceCitationChecklist: [
        "Source citation checklist: blocked until the operator confirms source, citation, owner, and allowed use.",
      ],
      redactionChecklist: [
        "Redaction checklist: blocked because private live evidence stays redacted.",
      ],
      deniedEvidenceActions: [
        "Denied evidence actions: automatic ingestion, output storage, connector fetch, provider send, file write, memory mutation, and approval persistence remain blocked.",
      ],
      retentionBoundaryNotes: [
        "Retention boundary notes: blocked evidence is not retained or stored by this route.",
      ],
      blockedEvidenceRisks: [
        "Blocked evidence risks: unreviewed citation, unredacted private content, live output storage, and unsafe evidence reuse.",
      ],
      resultReviewInboxRoute: "Result review inbox route: /live-workflow-result-review-inbox remains review-only.",
      operatorFeedbackRoute: "Operator feedback route: /live-workflow-operator-feedback-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep evidence blocked until source, citation, redaction, and operator review are complete.",
      advancedEvidenceDetails:
        "Advanced evidence details: blocked evidence capture cannot recover by ingesting evidence, storing live outputs, fetching connector data, sending prompts, mutating files, or mutating memory.",
    }),
  ];
}

export function buildLiveWorkflowEvidenceCaptureReviewBoundary(): LiveWorkflowEvidenceCaptureReviewBoundary {
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

export function summarizeLiveWorkflowEvidenceCaptureReview(
  model: Pick<LiveWorkflowEvidenceCaptureReviewModel, "reviews">
): string {
  return `Live workflow evidence capture review previews evidence capture without ingesting or storing live evidence across ${model.reviews.length} evidence capture preview(s). Live workflow evidence capture review does not ingest evidence automatically, live workflow evidence requires operator review before use, and private live evidence stays redacted.`;
}

export function buildLiveWorkflowEvidenceCaptureReviewModel(): LiveWorkflowEvidenceCaptureReviewModel {
  const reviews = buildLiveWorkflowEvidenceCaptureReviewReviews();
  const model: LiveWorkflowEvidenceCaptureReviewModel = {
    title: "Live workflow evidence capture review",
    summary: "",
    reviews,
    boundary: buildLiveWorkflowEvidenceCaptureReviewBoundary(),
    reviewLanguage: [...LIVE_WORKFLOW_EVIDENCE_CAPTURE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Live workflow evidence capture review",
      "Live workflow evidence capture review does not ingest evidence automatically",
      "Live workflow evidence requires operator review before use",
      "Private live evidence stays redacted",
      "Evidence capture groups",
      "Source citation checklist",
      "live workflow evidence capture identity",
      "live workflow evidence capture identity",
      "Evidence capture groups",
      "Source citation checklist",
      "redaction checklist",
      "denied evidence actions",
      "retention boundary notes",
      "blocked evidence risks",
      "result review inbox route",
      "operator feedback route",
      "next recommended action",
      "advanced evidence details collapsed/secondary",
      "review-only",
      "approval required",
      "advanced details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLiveWorkflowEvidenceCaptureReview(model) };
}
