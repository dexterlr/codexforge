import type {
  FirstProviderLiveCallTrialReview,
  FirstProviderLiveCallTrialReviewBoundary,
  FirstProviderLiveCallTrialReviewModel,
} from "./first-provider-live-call-trial-review-types";
import { buildFirstProviderLiveCallTrialReviewStableKey } from "./first-provider-live-call-trial-review-types";

export const FIRST_PROVIDER_LIVE_CALL_TRIAL_REVIEW_LANGUAGE = [
  "First provider live call trial review",
  "First provider live call trial review does not send provider requests",
  "Provider requests require explicit operator approval",
  "Unapproved provider calls remain blocked",
  "Trial stages",
  "Cost rate-limit checklist",
] as const;

export function buildFirstProviderLiveCallTrialReview(
  input: Omit<FirstProviderLiveCallTrialReview, "id"> & { idHint: string }
): FirstProviderLiveCallTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildFirstProviderLiveCallTrialReviewStableKey("first-provider-live-call-trial-review", idHint, input.status),
    ...review,
  };
}

export function buildFirstProviderLiveCallTrialReviews(): FirstProviderLiveCallTrialReview[] {
  return [
    buildFirstProviderLiveCallTrialReview({
      idHint: "review-only-first-provider-request",
      status: "ready-for-review",
      firstProviderLiveCallTrialIdentity:
        "First provider live call trial identity: first-provider-live-call-trial-review-review-only-first-provider-request.",
      trialStages: [
        "Trial stages: confirm guard review, review redacted request class, review approval gate, review cost rate-limit checklist, then route any future response to capture review.",
        "Trial stages: first provider live call trial review does not send provider requests.",
      ],
      providerRequestReviewChecklist: [
        "Provider request review checklist: request owner, provider family label, redacted prompt class, expected response handling, credential boundary, and denied follow-up actions are visible as labels only.",
        "Provider request review checklist: no provider request is sent, queued, routed, or retried from this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: provider requests require explicit operator approval before any future live request can be created outside this page.",
        "Approval gate checklist: this page does not approve actions, persist approval decisions, or automate approval.",
      ],
      costRateLimitChecklist: [
        "Cost rate-limit checklist: manual budget owner, rate-limit hold, retry denied state, response capture hold, and cost review route are reviewed before approval.",
        "Cost rate-limit checklist: no token spend, billing lookup, retry loop, or provider switch can start here.",
      ],
      deniedProviderTrialActions: [
        "Denied provider trial actions: send provider request, call provider, test connection, route traffic, send prompts, store outputs, ingest responses, retry provider calls, switch providers, or spend tokens.",
        "Denied provider trial actions: execute workflows, call local models, call local bridge endpoints, call connectors, mutate files, mutate memory, or create automations.",
      ],
      blockedProviderTrialRisks: [
        "Blocked provider trial risks: missing approval, private prompt leakage, credential exposure, unreviewed cost, unsafe retry, response persistence, and live provider traffic.",
        "Blocked provider trial risks: unapproved provider calls remain blocked.",
      ],
      providerResponseCaptureRoute:
        "Provider response capture route: /provider-live-response-capture-review reviews response handling without storing provider outputs.",
      providerReleaseCandidateRoute:
        "Provider release candidate route: /provider-live-trial-release-candidate summarizes readiness without routing live provider traffic.",
      nextRecommendedAction:
        "Next recommended action: complete response capture and release candidate review before asking for any future provider live-call approval.",
      advancedTrialDetails:
        "Advanced trial details: first provider live call trial review is review-only. First provider live call trial review does not send provider requests, provider requests require explicit operator approval, and unapproved provider calls remain blocked. It does not call providers, send prompts, route provider traffic, store outputs, ingest responses, persist approvals, execute workflows, call local models, call connectors, create automations, mutate files, mutate memory, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildFirstProviderLiveCallTrialReview({
      idHint: "blocked-unapproved-provider-request",
      status: "blocked",
      firstProviderLiveCallTrialIdentity:
        "First provider live call trial identity: first-provider-live-call-trial-review-blocked-unapproved-provider-request.",
      trialStages: [
        "Trial stages: blocked when a request asks this page to send the first provider request.",
      ],
      providerRequestReviewChecklist: [
        "Provider request review checklist: blocked because provider requests require explicit operator approval outside this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because unapproved provider calls remain blocked.",
      ],
      costRateLimitChecklist: [
        "Cost rate-limit checklist: blocked until cost and rate-limit posture is reviewed.",
      ],
      deniedProviderTrialActions: [
        "Denied provider trial actions: provider request sends, prompt sends, traffic routing, output storage, and response ingestion remain blocked.",
      ],
      blockedProviderTrialRisks: [
        "Blocked provider trial risks: unapproved provider request and unsafe response handling remain blocked.",
      ],
      providerResponseCaptureRoute:
        "Provider response capture route: /provider-live-response-capture-review remains review-only.",
      providerReleaseCandidateRoute:
        "Provider release candidate route: /provider-live-trial-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the first live call blocked until all review gates are complete.",
      advancedTrialDetails:
        "Advanced trial details: blocked provider trial cannot recover by calling providers, sending prompts, routing traffic, storing outputs, writing files, or mutating memory.",
    }),
  ];
}

export function buildFirstProviderLiveCallTrialReviewBoundary(): FirstProviderLiveCallTrialReviewBoundary {
  return {
    firstProviderLiveCallTrialReviewOnly: true,
    firstProviderLiveCallTrialReviewDoesNotSendProviderRequests: true,
    providerRequestsRequireExplicitOperatorApproval: true,
    unapprovedProviderCallsRemainBlocked: true,
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

export function summarizeFirstProviderLiveCallTrialReview(
  model: Pick<FirstProviderLiveCallTrialReviewModel, "reviews">
): string {
  return `First provider live call trial review previews ${model.reviews.length} provider trial posture(s). First provider live call trial review does not send provider requests, provider requests require explicit operator approval, and unapproved provider calls remain blocked.`;
}

export function buildFirstProviderLiveCallTrialReviewModel(): FirstProviderLiveCallTrialReviewModel {
  const reviews = buildFirstProviderLiveCallTrialReviews();
  const model: FirstProviderLiveCallTrialReviewModel = {
    title: "First provider live call trial review",
    summary: "",
    reviews,
    boundary: buildFirstProviderLiveCallTrialReviewBoundary(),
    trialLanguage: [...FIRST_PROVIDER_LIVE_CALL_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "First provider live call trial review",
      "first provider live call trial identity",
      "Trial stages",
      "provider request review checklist",
      "approval gate checklist",
      "Cost rate-limit checklist",
      "denied provider trial actions",
      "blocked provider trial risks",
      "provider response capture route",
      "provider release candidate route",
      "next recommended action",
      "First provider live call trial review does not send provider requests",
      "Provider requests require explicit operator approval",
      "Unapproved provider calls remain blocked",
      "advanced trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFirstProviderLiveCallTrialReview(model) };
}
