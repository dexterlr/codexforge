import type {
  LocalModelLiveCallGuardReview,
  LocalModelLiveCallGuardReviewBoundary,
  LocalModelLiveCallGuardReviewModel,
} from "./local-model-live-call-guard-review-types";
import { buildLocalModelLiveCallGuardReviewStableKey } from "./local-model-live-call-guard-review-types";

export const LOCAL_MODEL_LIVE_CALL_GUARD_REVIEW_LANGUAGE = [
  "Local model live call guard review",
  "Local model live call guard review does not call local models",
  "Local model calls require explicit operator approval",
  "Local endpoints stay private",
  "Local runtime guard groups",
  "Local bridge boundary checklist",
] as const;

export function buildLocalModelLiveCallGuardReview(
  input: Omit<LocalModelLiveCallGuardReview, "id"> & { idHint: string }
): LocalModelLiveCallGuardReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalModelLiveCallGuardReviewStableKey("local-model-live-call-guard-review", idHint, input.status),
    ...review,
  };
}

export function buildLocalModelLiveCallGuardReviews(): LocalModelLiveCallGuardReview[] {
  return [
    buildLocalModelLiveCallGuardReview({
      idHint: "review-only-local-guard",
      status: "ready-for-review",
      localModelLiveCallGuardIdentity:
        "Local model live call guard identity: local-model-live-call-guard-review-review-only-local-guard.",
      localRuntimeGuardGroups: [
        "Local runtime guard groups: local endpoint privacy, local bridge boundary, prompt privacy, output capture hold, approval hold, and runtime failover hold.",
        "Local runtime guard groups: groups are labels only; local model live call guard review does not call local models.",
      ],
      localBridgeBoundaryChecklist: [
        "Local bridge boundary checklist: local bridge endpoints stay private, no bridge endpoint is called, no local endpoint is probed, and no local endpoint is stored.",
        "Local bridge boundary checklist: local endpoints stay private and raw endpoint values are never displayed.",
      ],
      promptPrivacyChecklist: [
        "Prompt privacy checklist: private prompt text is not sent, prompt classes stay labels only, and prompt replay remains blocked.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: local model calls require explicit operator approval and approval is not persisted or automated here.",
      ],
      deniedLocalLiveCallActions: [
        "Denied local live-call actions: call local models, invoke local models, call local bridge endpoints, probe local endpoints, send prompts, store outputs, route local model traffic, switch runtimes, or retry models.",
        "Denied local live-call actions: call providers, call connectors, create automations, execute workflows, mutate files, or mutate memory.",
      ],
      blockedLocalCallRisks: [
        "Blocked local call risks: endpoint exposure, local bridge call, unapproved prompt send, unapproved local model call, output persistence, runtime switch, retry loop, and memory ingestion.",
      ],
      firstLocalModelTrialRoute:
        "First local model trial route: /first-local-model-live-trial-review previews a local model trial without invoking local models.",
      localModelOutputCaptureRoute:
        "Local model output capture route: /local-model-live-output-capture-review reviews output handling without storing model outputs.",
      nextRecommendedAction:
        "Next recommended action: review first local model trial and output capture boundaries before any future local model approval packet.",
      advancedGuardDetails:
        "Advanced guard details: local model live call guard review is review-only. Local model live call guard review does not call local models, local model calls require explicit operator approval, and local endpoints stay private. It does not call local models, invoke local models, call local bridge endpoints, probe endpoints, send prompts, store outputs, ingest outputs, route traffic, persist approvals, call providers, call connectors, create automations, execute workflows, mutate files, mutate memory, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildLocalModelLiveCallGuardReview({
      idHint: "blocked-local-call-request",
      status: "blocked",
      localModelLiveCallGuardIdentity:
        "Local model live call guard identity: local-model-live-call-guard-review-blocked-local-call-request.",
      localRuntimeGuardGroups: [
        "Local runtime guard groups: blocked when a request asks this page to call a local model or local bridge endpoint.",
      ],
      localBridgeBoundaryChecklist: [
        "Local bridge boundary checklist: blocked because local bridge endpoints stay private and are never called from this page.",
      ],
      promptPrivacyChecklist: [
        "Prompt privacy checklist: blocked because prompts cannot be sent from this review surface.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because local model calls require explicit operator approval outside this page.",
      ],
      deniedLocalLiveCallActions: [
        "Denied local live-call actions: local model calls, local model invocation, bridge calls, endpoint storage, prompt sending, output storage, and output ingestion remain blocked.",
      ],
      blockedLocalCallRisks: [
        "Blocked local call risks: unapproved local model activity and endpoint exposure remain blocked.",
      ],
      firstLocalModelTrialRoute:
        "First local model trial route: /first-local-model-live-trial-review remains review-only.",
      localModelOutputCaptureRoute:
        "Local model output capture route: /local-model-live-output-capture-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep local model calls blocked until trial and output capture reviews are complete.",
      advancedGuardDetails:
        "Advanced guard details: blocked local guard cannot recover by calling local models, invoking models, calling local bridge endpoints, sending prompts, storing outputs, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelLiveCallGuardReviewBoundary(): LocalModelLiveCallGuardReviewBoundary {
  return {
    localModelLiveCallGuardReviewOnly: true,
    localModelLiveCallGuardReviewDoesNotCallLocalModels: true,
    localModelCallsRequireExplicitOperatorApproval: true,
    localEndpointsStayPrivate: true,
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

export function summarizeLocalModelLiveCallGuardReview(
  model: Pick<LocalModelLiveCallGuardReviewModel, "reviews">
): string {
  return `Local model live call guard review prepares ${model.reviews.length} local live-call guard posture(s). Local model live call guard review does not call local models, local model calls require explicit operator approval, and local endpoints stay private.`;
}

export function buildLocalModelLiveCallGuardReviewModel(): LocalModelLiveCallGuardReviewModel {
  const reviews = buildLocalModelLiveCallGuardReviews();
  const model: LocalModelLiveCallGuardReviewModel = {
    title: "Local model live call guard review",
    summary: "",
    reviews,
    boundary: buildLocalModelLiveCallGuardReviewBoundary(),
    guardLanguage: [...LOCAL_MODEL_LIVE_CALL_GUARD_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model live call guard review",
      "local model live call guard identity",
      "Local runtime guard groups",
      "Local bridge boundary checklist",
      "Prompt privacy checklist",
      "approval gate checklist",
      "denied local live-call actions",
      "blocked local call risks",
      "first local model trial route",
      "local model output capture route",
      "next recommended action",
      "Local model live call guard review does not call local models",
      "Local model calls require explicit operator approval",
      "Local endpoints stay private",
      "advanced guard details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelLiveCallGuardReview(model) };
}
