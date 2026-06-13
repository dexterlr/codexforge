import type {
  LocalModelLiveOutputCaptureReview,
  LocalModelLiveOutputCaptureReviewBoundary,
  LocalModelLiveOutputCaptureReviewModel,
} from "./local-model-live-output-capture-review-types";
import { buildLocalModelLiveOutputCaptureReviewStableKey } from "./local-model-live-output-capture-review-types";

export const LOCAL_MODEL_LIVE_OUTPUT_CAPTURE_REVIEW_LANGUAGE = [
  "Local model live output capture review",
  "Local model live output capture review does not store model outputs",
  "Local model outputs require operator review before use",
  "Unsafe local model outputs remain blocked",
  "Output capture groups",
  "Operator review checklist",
] as const;

export function buildLocalModelLiveOutputCaptureReview(
  input: Omit<LocalModelLiveOutputCaptureReview, "id"> & { idHint: string }
): LocalModelLiveOutputCaptureReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalModelLiveOutputCaptureReviewStableKey("local-model-live-output-capture-review", idHint, input.status),
    ...review,
  };
}

export function buildLocalModelLiveOutputCaptureReviews(): LocalModelLiveOutputCaptureReview[] {
  return [
    buildLocalModelLiveOutputCaptureReview({
      idHint: "review-only-output-capture",
      status: "ready-for-review",
      localModelOutputCaptureIdentity:
        "Local model output capture identity: local-model-live-output-capture-review-review-only-output-capture.",
      outputCaptureGroups: [
        "Output capture groups: redacted prompt class, local runtime family label, output safety label, privacy label, quality note, operator decision hold, and blocked-use decision.",
        "Output capture groups: groups are labels only; local model live output capture review does not store model outputs.",
      ],
      redactionChecklist: [
        "Redaction checklist: raw local model output is not stored, private prompt details stay redacted, credentials stay hidden, and local endpoints stay private.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: unsafe local model outputs remain blocked, unsupported tool action claims remain blocked, and follow-up prompts remain denied.",
      ],
      operatorReviewChecklist: [
        "Operator review checklist: local model outputs require operator review before use, and output acceptance cannot be automated by this page.",
      ],
      deniedOutputActions: [
        "Denied output actions: store model outputs, ingest outputs, auto-accept output, auto-promote memory, call local models, invoke local models, send follow-up prompts, route local model traffic, or write files.",
        "Denied output actions: call providers, call connectors, create automations, execute workflows, approve actions, or mutate memory.",
      ],
      blockedOutputRisks: [
        "Blocked output risks: raw output persistence, unsafe output use, prompt leakage, endpoint exposure, hallucinated action, follow-up prompt send, and memory ingestion.",
        "Blocked output risks: unsafe local model outputs remain blocked.",
      ],
      localReleaseCandidateRoute:
        "Local release candidate route: /local-model-live-trial-release-candidate summarizes local model trial readiness without routing live local-model traffic.",
      providerLiveTrialRoute:
        "Provider live trial route: /provider-live-trial-release-candidate remains provider review-only.",
      nextRecommendedAction:
        "Next recommended action: complete local model live trial release candidate review after output capture checks stay blocked and review-only.",
      advancedOutputDetails:
        "Advanced output details: local model live output capture review is review-only. Local model live output capture review does not store model outputs, local model outputs require operator review before use, and unsafe local model outputs remain blocked. It does not store outputs, ingest outputs, call local models, invoke local models, call local bridge endpoints, send prompts, route traffic, persist approvals, mutate files, mutate memory, call providers, call connectors, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildLocalModelLiveOutputCaptureReview({
      idHint: "blocked-output-storage-request",
      status: "blocked",
      localModelOutputCaptureIdentity:
        "Local model output capture identity: local-model-live-output-capture-review-blocked-output-storage-request.",
      outputCaptureGroups: [
        "Output capture groups: blocked when a request asks this page to save, ingest, reuse, or auto-accept local model output.",
      ],
      redactionChecklist: [
        "Redaction checklist: blocked because raw local model output is never stored here.",
      ],
      safetyReviewChecklist: [
        "Safety review checklist: blocked because unsafe local model outputs remain blocked.",
      ],
      operatorReviewChecklist: [
        "Operator review checklist: blocked because local model outputs require operator review before use.",
      ],
      deniedOutputActions: [
        "Denied output actions: output storage, output ingestion, output acceptance, local model calls, follow-up prompt sending, file writes, and memory mutation remain blocked.",
      ],
      blockedOutputRisks: [
        "Blocked output risks: unsafe output handling remains blocked.",
      ],
      localReleaseCandidateRoute:
        "Local release candidate route: /local-model-live-trial-release-candidate remains review-only.",
      providerLiveTrialRoute:
        "Provider live trial route: /provider-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep output capture blocked until redaction, safety, and operator review are complete.",
      advancedOutputDetails:
        "Advanced output details: blocked output capture cannot recover by storing outputs, ingesting outputs, invoking local models, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelLiveOutputCaptureReviewBoundary(): LocalModelLiveOutputCaptureReviewBoundary {
  return {
    localModelLiveOutputCaptureReviewOnly: true,
    localModelLiveOutputCaptureReviewDoesNotStoreModelOutputs: true,
    localModelOutputsRequireOperatorReviewBeforeUse: true,
    unsafeLocalModelOutputsRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localModelInvocationAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localEndpointStorageAllowedFromUi: false,
    localModelTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    localModelOutputStorageAllowedFromUi: false,
    localModelOutputIngestionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerLiveConnectionTestsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    providerResponseIngestionAllowedFromUi: false,
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

export function summarizeLocalModelLiveOutputCaptureReview(
  model: Pick<LocalModelLiveOutputCaptureReviewModel, "reviews">
): string {
  return `Local model live output capture review previews ${model.reviews.length} output capture posture(s). Local model live output capture review does not store model outputs, local model outputs require operator review before use, and unsafe local model outputs remain blocked.`;
}

export function buildLocalModelLiveOutputCaptureReviewModel(): LocalModelLiveOutputCaptureReviewModel {
  const reviews = buildLocalModelLiveOutputCaptureReviews();
  const model: LocalModelLiveOutputCaptureReviewModel = {
    title: "Local model live output capture review",
    summary: "",
    reviews,
    boundary: buildLocalModelLiveOutputCaptureReviewBoundary(),
    outputLanguage: [...LOCAL_MODEL_LIVE_OUTPUT_CAPTURE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model live output capture review",
      "local model output capture identity",
      "Output capture groups",
      "redaction checklist",
      "safety review checklist",
      "Operator review checklist",
      "denied output actions",
      "blocked output risks",
      "local release candidate route",
      "provider live trial route",
      "next recommended action",
      "Local model live output capture review does not store model outputs",
      "Local model outputs require operator review before use",
      "Unsafe local model outputs remain blocked",
      "advanced output details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelLiveOutputCaptureReview(model) };
}
