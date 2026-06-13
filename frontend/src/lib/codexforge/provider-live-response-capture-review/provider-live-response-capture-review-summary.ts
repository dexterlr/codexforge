import type {
  ProviderLiveResponseCaptureReview,
  ProviderLiveResponseCaptureReviewBoundary,
  ProviderLiveResponseCaptureReviewModel,
} from "./provider-live-response-capture-review-types";
import { buildProviderLiveResponseCaptureReviewStableKey } from "./provider-live-response-capture-review-types";

export const PROVIDER_LIVE_RESPONSE_CAPTURE_REVIEW_LANGUAGE = [
  "Provider live response capture review",
  "Provider live response capture review does not store provider outputs",
  "Provider responses require operator review before use",
  "Unsafe provider responses remain blocked",
  "Response capture groups",
  "Safety review checklist",
] as const;

export function buildProviderLiveResponseCaptureReview(
  input: Omit<ProviderLiveResponseCaptureReview, "id"> & { idHint: string }
): ProviderLiveResponseCaptureReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderLiveResponseCaptureReviewStableKey(
      "provider-live-response-capture-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildProviderLiveResponseCaptureReviews(): ProviderLiveResponseCaptureReview[] {
  return [
    buildProviderLiveResponseCaptureReview({
      idHint: "review-only-response-capture",
      status: "ready-for-review",
      providerLiveResponseCaptureIdentity:
        "Provider live response capture identity: provider-live-response-capture-review-review-only-response-capture.",
      responseCaptureGroups: [
        "Response capture groups: redacted response class, refusal state, safety outcome, cost label, rate-limit label, review owner, and blocked-use decision.",
        "Response capture groups: groups are labels only; provider live response capture review does not store provider outputs.",
      ],
      redactionChecklist: [
        "Redaction checklist: raw provider output is not stored, private prompt details stay redacted, credentials stay hidden, and endpoint details stay hidden.",
        "Redaction checklist: response summaries are review labels only and cannot become memory or files from this page.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: provider responses require operator review before use, unsafe provider responses remain blocked, and follow-up prompts remain denied.",
        "Safety review checklist: unsafe actions, tool-use claims, file mutation requests, and memory mutation requests stay blocked.",
      ],
      costRateLimitRecordChecklist: [
        "Cost/rate-limit record checklist: record owner, budget label, rate-limit label, retry denied state, and manual review note are previewed without fetching billing.",
      ],
      deniedResponseActions: [
        "Denied response actions: store provider outputs, ingest responses, auto-accept output, auto-promote memory, send follow-up prompts, call providers, route traffic, or write files.",
        "Denied response actions: call local models, call connectors, create automations, execute workflows, approve actions, or mutate memory.",
      ],
      blockedResponseRisks: [
        "Blocked response risks: raw output persistence, unsafe response use, private prompt leakage, credential leakage, hallucinated action, unsafe follow-up prompt, and memory ingestion.",
        "Blocked response risks: unsafe provider responses remain blocked.",
      ],
      providerReleaseCandidateRoute:
        "Provider release candidate route: /provider-live-trial-release-candidate summarizes provider trial readiness without routing live provider traffic.",
      localModelLiveGuardRoute:
        "Local model live guard route: /local-model-live-call-guard-review prepares local model guardrails without calling local models.",
      nextRecommendedAction:
        "Next recommended action: complete provider release candidate review, then prepare the local model live guard review.",
      advancedCaptureDetails:
        "Advanced capture details: provider live response capture review is review-only. Provider live response capture review does not store provider outputs, provider responses require operator review before use, and unsafe provider responses remain blocked. It does not store outputs, ingest responses, call providers, route traffic, send prompts, persist approvals, mutate files, mutate memory, call connectors, call local models, call local bridge endpoints, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildProviderLiveResponseCaptureReview({
      idHint: "blocked-output-storage-request",
      status: "blocked",
      providerLiveResponseCaptureIdentity:
        "Provider live response capture identity: provider-live-response-capture-review-blocked-output-storage-request.",
      responseCaptureGroups: [
        "Response capture groups: blocked when a request asks this page to save, ingest, reuse, or auto-accept provider output.",
      ],
      redactionChecklist: [
        "Redaction checklist: blocked because raw provider output is never stored here.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: blocked because provider responses require operator review before use.",
      ],
      costRateLimitRecordChecklist: [
        "Cost/rate-limit record checklist: blocked because live billing and provider calls cannot run here.",
      ],
      deniedResponseActions: [
        "Denied response actions: output storage, response ingestion, follow-up prompt sending, provider calls, file writes, and memory mutation remain blocked.",
      ],
      blockedResponseRisks: [
        "Blocked response risks: unsafe provider response handling remains blocked.",
      ],
      providerReleaseCandidateRoute:
        "Provider release candidate route: /provider-live-trial-release-candidate remains review-only.",
      localModelLiveGuardRoute:
        "Local model live guard route: /local-model-live-call-guard-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep response capture blocked until redaction and safety review are complete.",
      advancedCaptureDetails:
        "Advanced capture details: blocked response capture cannot recover by storing outputs, ingesting responses, calling providers, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderLiveResponseCaptureReviewBoundary(): ProviderLiveResponseCaptureReviewBoundary {
  return {
    providerLiveResponseCaptureReviewOnly: true,
    providerLiveResponseCaptureReviewDoesNotStoreProviderOutputs: true,
    providerResponsesRequireOperatorReviewBeforeUse: true,
    unsafeProviderResponsesRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerResponseIngestionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
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
    connectorDataStorageAllowed: false,
    automationDataStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    routeCoverageRemovalAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderLiveResponseCaptureReview(
  model: Pick<ProviderLiveResponseCaptureReviewModel, "reviews">
): string {
  return `Provider live response capture review previews ${model.reviews.length} response capture posture(s). Provider live response capture review does not store provider outputs, provider responses require operator review before use, and unsafe provider responses remain blocked.`;
}

export function buildProviderLiveResponseCaptureReviewModel(): ProviderLiveResponseCaptureReviewModel {
  const reviews = buildProviderLiveResponseCaptureReviews();
  const model: ProviderLiveResponseCaptureReviewModel = {
    title: "Provider live response capture review",
    summary: "",
    reviews,
    boundary: buildProviderLiveResponseCaptureReviewBoundary(),
    captureLanguage: [...PROVIDER_LIVE_RESPONSE_CAPTURE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider live response capture review",
      "provider live response capture identity",
      "Response capture groups",
      "redaction checklist",
      "Safety review checklist",
      "cost/rate-limit record checklist",
      "denied response actions",
      "blocked response risks",
      "provider release candidate route",
      "local model live guard route",
      "next recommended action",
      "Provider live response capture review does not store provider outputs",
      "Provider responses require operator review before use",
      "Unsafe provider responses remain blocked",
      "advanced capture details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderLiveResponseCaptureReview(model) };
}
