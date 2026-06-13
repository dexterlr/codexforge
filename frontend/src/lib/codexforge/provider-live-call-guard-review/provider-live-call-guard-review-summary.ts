import type {
  ProviderLiveCallGuardReview,
  ProviderLiveCallGuardReviewBoundary,
  ProviderLiveCallGuardReviewModel,
} from "./provider-live-call-guard-review-types";
import { buildProviderLiveCallGuardReviewStableKey } from "./provider-live-call-guard-review-types";

export const PROVIDER_LIVE_CALL_GUARD_REVIEW_LANGUAGE = [
  "Provider live call guard review",
  "Provider live call guard review does not call providers",
  "Provider live calls require explicit operator approval",
  "Provider credentials stay private",
  "Live call guard groups",
  "Credential boundary checklist",
] as const;

export function buildProviderLiveCallGuardReview(
  input: Omit<ProviderLiveCallGuardReview, "id"> & { idHint: string }
): ProviderLiveCallGuardReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderLiveCallGuardReviewStableKey("provider-live-call-guard-review", idHint, input.status),
    ...review,
  };
}

export function buildProviderLiveCallGuardReviews(): ProviderLiveCallGuardReview[] {
  return [
    buildProviderLiveCallGuardReview({
      idHint: "review-only-live-call-guard",
      status: "ready-for-review",
      providerLiveCallGuardIdentity:
        "Provider live call guard identity: provider-live-call-guard-review-review-only-live-call-guard.",
      liveCallGuardGroups: [
        "Live call guard groups: credential boundary, prompt send hold, cost and rate-limit hold, response capture hold, safety regression hold, and operator approval hold.",
        "Live call guard groups: each group is reviewed as static text; provider live call guard review does not call providers.",
      ],
      credentialBoundaryChecklist: [
        "Credential boundary checklist: provider credentials stay private, keys stay hidden, tokens stay hidden, endpoints stay hidden, browser storage is not used, and process.env values are not printed.",
        "Credential boundary checklist: this page does not store credentials, tokens, endpoints, provider settings, prompts, responses, or outputs.",
      ],
      promptSendingChecklist: [
        "Prompt sending checklist: no prompt text is sent, no prompt replay starts, private prompt details stay redacted, and prompt classes stay labels only.",
        "Prompt sending checklist: provider live calls require explicit operator approval before any future request can exist outside this page.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: provider call approval, prompt approval, credential boundary approval, cost approval, safety approval, and response capture approval must remain explicit.",
        "Approval gate checklist: approval is never granted, persisted, or automated by this review surface.",
      ],
      deniedProviderLiveCallActions: [
        "Denied provider live-call actions: call provider, test provider connection, send prompt, route live traffic, store output, ingest response, persist approval, switch provider, retry provider, or spend tokens.",
        "Denied provider live-call actions: execute workflows, call connectors, call local models, call local bridge endpoints, mutate files, mutate memory, create automations, or run commands.",
      ],
      blockedLiveCallRisks: [
        "Blocked live-call risks: credential exposure, hidden endpoint, unapproved prompt send, unapproved provider request, response persistence, retry loop, live traffic route, cost uncertainty, and safety blocker.",
        "Blocked live-call risks: unresolved live-call risks remain blocked until reviewed and approved outside this page.",
      ],
      firstProviderLiveCallTrialRoute:
        "First provider live call trial route: /first-provider-live-call-trial-review previews the first provider request without sending it.",
      providerResponseCaptureRoute:
        "Provider response capture route: /provider-live-response-capture-review reviews response handling without storing provider outputs.",
      nextRecommendedAction:
        "Next recommended action: review the first provider live call trial and response capture boundaries before any future provider-call approval packet.",
      advancedGuardDetails:
        "Advanced guard details: provider live call guard review is review-only. Provider live call guard review does not call providers, provider live calls require explicit operator approval, and provider credentials stay private. It does not call providers, test provider connections, route provider traffic, send prompts, store provider outputs, ingest provider responses, store credentials, store tokens, store endpoints, persist approvals, execute workflows, call local models, call local bridge endpoints, call connectors, create automations, mutate files, mutate memory, execute tools, execute plugins, execute agents, or create an MCP runtime.",
    }),
    buildProviderLiveCallGuardReview({
      idHint: "blocked-live-call-request",
      status: "blocked",
      providerLiveCallGuardIdentity:
        "Provider live call guard identity: provider-live-call-guard-review-blocked-live-call-request.",
      liveCallGuardGroups: [
        "Live call guard groups: blocked when a request asks this page to call a provider, test a connection, send a prompt, or route provider traffic.",
      ],
      credentialBoundaryChecklist: [
        "Credential boundary checklist: blocked because provider credentials stay private and no credential value can be stored or shown.",
      ],
      promptSendingChecklist: [
        "Prompt sending checklist: blocked because this page never sends prompts to providers.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because provider live calls require explicit operator approval outside this page.",
      ],
      deniedProviderLiveCallActions: [
        "Denied provider live-call actions: provider calls, provider connection tests, prompt sends, response storage, output ingestion, and live traffic routing remain blocked.",
      ],
      blockedLiveCallRisks: [
        "Blocked live-call risks: unapproved provider traffic and credential exposure remain blocked.",
      ],
      firstProviderLiveCallTrialRoute:
        "First provider live call trial route: /first-provider-live-call-trial-review remains review-only.",
      providerResponseCaptureRoute:
        "Provider response capture route: /provider-live-response-capture-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the live call blocked and finish the trial and response capture reviews.",
      advancedGuardDetails:
        "Advanced guard details: blocked live call guard cannot recover by calling providers, sending prompts, testing connections, storing outputs, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderLiveCallGuardReviewBoundary(): ProviderLiveCallGuardReviewBoundary {
  return {
    providerLiveCallGuardReviewOnly: true,
    providerLiveCallGuardReviewDoesNotCallProviders: true,
    providerLiveCallsRequireExplicitOperatorApproval: true,
    providerCredentialsStayPrivate: true,
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

export function summarizeProviderLiveCallGuardReview(
  model: Pick<ProviderLiveCallGuardReviewModel, "reviews">
): string {
  return `Provider live call guard review prepares ${model.reviews.length} live-call guard posture(s). Provider live call guard review does not call providers, provider live calls require explicit operator approval, and provider credentials stay private.`;
}

export function buildProviderLiveCallGuardReviewModel(): ProviderLiveCallGuardReviewModel {
  const reviews = buildProviderLiveCallGuardReviews();
  const model: ProviderLiveCallGuardReviewModel = {
    title: "Provider live call guard review",
    summary: "",
    reviews,
    boundary: buildProviderLiveCallGuardReviewBoundary(),
    guardLanguage: [...PROVIDER_LIVE_CALL_GUARD_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider live call guard review",
      "provider live call guard identity",
      "Live call guard groups",
      "Credential boundary checklist",
      "prompt sending checklist",
      "approval gate checklist",
      "denied provider live-call actions",
      "blocked live-call risks",
      "first provider live call trial route",
      "provider response capture route",
      "next recommended action",
      "Provider live call guard review does not call providers",
      "Provider live calls require explicit operator approval",
      "Provider credentials stay private",
      "advanced guard details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderLiveCallGuardReview(model) };
}
