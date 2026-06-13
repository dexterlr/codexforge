import type {
  FirstLocalModelLiveTrialReview,
  FirstLocalModelLiveTrialReviewBoundary,
  FirstLocalModelLiveTrialReviewModel,
} from "./first-local-model-live-trial-review-types";
import { buildFirstLocalModelLiveTrialReviewStableKey } from "./first-local-model-live-trial-review-types";

export const FIRST_LOCAL_MODEL_LIVE_TRIAL_REVIEW_LANGUAGE = [
  "First local model live trial review",
  "First local model live trial review does not invoke local models",
  "Local model trial requires explicit operator approval",
  "Unapproved local model calls remain blocked",
  "Runtime readiness checklist",
  "Prompt privacy checklist",
] as const;

export function buildFirstLocalModelLiveTrialReview(
  input: Omit<FirstLocalModelLiveTrialReview, "id"> & { idHint: string }
): FirstLocalModelLiveTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildFirstLocalModelLiveTrialReviewStableKey("first-local-model-live-trial-review", idHint, input.status),
    ...review,
  };
}

export function buildFirstLocalModelLiveTrialReviews(): FirstLocalModelLiveTrialReview[] {
  return [
    buildFirstLocalModelLiveTrialReview({
      idHint: "review-only-local-trial",
      status: "ready-for-review",
      firstLocalModelLiveTrialIdentity:
        "First local model live trial identity: first-local-model-live-trial-review-review-only-local-trial.",
      trialStages: [
        "Trial stages: confirm local guard review, review runtime readiness checklist, review prompt privacy checklist, review approval gate, then route any future output to capture review.",
        "Trial stages: first local model live trial review does not invoke local models.",
      ],
      runtimeReadinessChecklist: [
        "Runtime readiness checklist: runtime family label, local bridge boundary, endpoint privacy, output capture route, failover hold, and operator owner are reviewed as labels only.",
        "Runtime readiness checklist: no local runtime is invoked, probed, or switched from this page.",
      ],
      promptPrivacyChecklist: [
        "Prompt privacy checklist: private prompt text stays hidden, prompt classes are labels only, prompt replay is denied, and prompt sending requires explicit approval elsewhere.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: local model trial requires explicit operator approval and approval cannot be granted, persisted, or automated here.",
      ],
      deniedLocalTrialActions: [
        "Denied local trial actions: invoke local models, call local models, call local bridge endpoints, probe endpoints, send prompts, store outputs, ingest outputs, route traffic, switch runtimes, or retry models.",
        "Denied local trial actions: call providers, call connectors, create automations, execute workflows, mutate files, or mutate memory.",
      ],
      blockedLocalTrialRisks: [
        "Blocked local trial risks: missing approval, endpoint exposure, prompt leakage, output persistence, unreviewed output use, runtime switch, retry loop, and memory ingestion.",
        "Blocked local trial risks: unapproved local model calls remain blocked.",
      ],
      localOutputCaptureRoute:
        "Local output capture route: /local-model-live-output-capture-review reviews output handling without storing model outputs.",
      localReleaseCandidateRoute:
        "Local release candidate route: /local-model-live-trial-release-candidate summarizes local model trial readiness without routing live local-model traffic.",
      nextRecommendedAction:
        "Next recommended action: review local output capture and release candidate posture before any future local trial approval packet.",
      advancedTrialDetails:
        "Advanced trial details: first local model live trial review is review-only. First local model live trial review does not invoke local models, local model trial requires explicit operator approval, and unapproved local model calls remain blocked. It does not call local models, invoke local models, call local bridge endpoints, probe endpoints, send prompts, store outputs, ingest outputs, route traffic, persist approvals, execute workflows, call providers, call connectors, create automations, mutate files, mutate memory, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildFirstLocalModelLiveTrialReview({
      idHint: "blocked-unapproved-local-trial",
      status: "blocked",
      firstLocalModelLiveTrialIdentity:
        "First local model live trial identity: first-local-model-live-trial-review-blocked-unapproved-local-trial.",
      trialStages: [
        "Trial stages: blocked when a request asks this page to invoke a local model.",
      ],
      runtimeReadinessChecklist: [
        "Runtime readiness checklist: blocked because local runtime checks require explicit operator approval outside this page.",
      ],
      promptPrivacyChecklist: [
        "Prompt privacy checklist: blocked because prompts cannot be sent from this review surface.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because unapproved local model calls remain blocked.",
      ],
      deniedLocalTrialActions: [
        "Denied local trial actions: local model invocation, local bridge endpoint calls, prompt sending, output storage, output ingestion, and runtime routing remain blocked.",
      ],
      blockedLocalTrialRisks: [
        "Blocked local trial risks: unapproved local model activity remains blocked.",
      ],
      localOutputCaptureRoute:
        "Local output capture route: /local-model-live-output-capture-review remains review-only.",
      localReleaseCandidateRoute:
        "Local release candidate route: /local-model-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep local trial blocked until guard and output capture reviews are complete.",
      advancedTrialDetails:
        "Advanced trial details: blocked local trial cannot recover by invoking local models, calling bridge endpoints, sending prompts, storing outputs, writing files, or mutating memory.",
    }),
  ];
}

export function buildFirstLocalModelLiveTrialReviewBoundary(): FirstLocalModelLiveTrialReviewBoundary {
  return {
    firstLocalModelLiveTrialReviewOnly: true,
    firstLocalModelLiveTrialReviewDoesNotInvokeLocalModels: true,
    localModelTrialRequiresExplicitOperatorApproval: true,
    unapprovedLocalModelCallsRemainBlocked: true,
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

export function summarizeFirstLocalModelLiveTrialReview(
  model: Pick<FirstLocalModelLiveTrialReviewModel, "reviews">
): string {
  return `First local model live trial review previews ${model.reviews.length} local model trial posture(s). First local model live trial review does not invoke local models, local model trial requires explicit operator approval, and unapproved local model calls remain blocked.`;
}

export function buildFirstLocalModelLiveTrialReviewModel(): FirstLocalModelLiveTrialReviewModel {
  const reviews = buildFirstLocalModelLiveTrialReviews();
  const model: FirstLocalModelLiveTrialReviewModel = {
    title: "First local model live trial review",
    summary: "",
    reviews,
    boundary: buildFirstLocalModelLiveTrialReviewBoundary(),
    trialLanguage: [...FIRST_LOCAL_MODEL_LIVE_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "First local model live trial review",
      "first local model live trial identity",
      "Trial stages",
      "Runtime readiness checklist",
      "Prompt privacy checklist",
      "approval gate checklist",
      "denied local trial actions",
      "blocked local trial risks",
      "local output capture route",
      "local release candidate route",
      "next recommended action",
      "First local model live trial review does not invoke local models",
      "Local model trial requires explicit operator approval",
      "Unapproved local model calls remain blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstLocalModelLiveTrialReview(model) };
}
