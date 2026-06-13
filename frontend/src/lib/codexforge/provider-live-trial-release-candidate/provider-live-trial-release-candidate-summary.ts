import type {
  ProviderLiveTrialReleaseCandidate,
  ProviderLiveTrialReleaseCandidateBoundary,
  ProviderLiveTrialReleaseCandidateModel,
} from "./provider-live-trial-release-candidate-types";
import { buildProviderLiveTrialReleaseCandidateStableKey } from "./provider-live-trial-release-candidate-types";

export const PROVIDER_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE = [
  "Provider live trial release candidate",
  "Provider live trial release candidate does not route live provider traffic",
  "Provider live trial release requires explicit approval",
  "Unresolved provider blockers stay blocked",
  "Live call guard status",
  "Cost rate safety status",
] as const;

export function buildProviderLiveTrialReleaseCandidate(
  input: Omit<ProviderLiveTrialReleaseCandidate, "id"> & { idHint: string }
): ProviderLiveTrialReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildProviderLiveTrialReleaseCandidateStableKey(
      "provider-live-trial-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildProviderLiveTrialReleaseCandidates(): ProviderLiveTrialReleaseCandidate[] {
  return [
    buildProviderLiveTrialReleaseCandidate({
      idHint: "review-only-provider-live-rc",
      status: "ready-for-review",
      providerLiveTrialCandidateIdentity:
        "Provider live trial candidate identity: provider-live-trial-release-candidate-review-only-provider-live-rc.",
      liveCallGuardStatus: [
        "Live call guard status: provider live call guard review is present, review-only, and still blocks provider calls until explicit approval.",
      ],
      firstProviderTrialStatus: [
        "First provider trial status: first provider live call trial review previews the request without sending provider requests.",
      ],
      responseCaptureStatus: [
        "Response capture status: provider live response capture review does not store provider outputs and requires operator review before use.",
      ],
      costRateSafetyStatus: [
        "Cost rate safety status: cost, rate-limit, safety regression, response capture, and approval gate posture remain review-only.",
      ],
      deniedProviderLivePaths: [
        "Denied provider live paths: route live provider traffic, call provider APIs, test provider connections, send prompts, store outputs, ingest responses, persist settings, or approve release.",
        "Denied provider live paths: connector calls, local model calls, local bridge endpoint calls, automation creation, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedProviderBlockers: [
        "Unresolved provider blockers: missing explicit approval, unresolved credential boundary, unresolved prompt privacy, unresolved cost/rate-limit review, unresolved safety review, and unresolved response capture.",
        "Unresolved provider blockers: unresolved provider blockers stay blocked.",
      ],
      localModelLiveGuardRoute:
        "Local model live guard route: /local-model-live-call-guard-review prepares local model guardrails without calling local models.",
      localModelTrialRoute:
        "Local model trial route: /first-local-model-live-trial-review previews a local model trial without invoking local models.",
      nextRecommendedAction:
        "Next recommended action: keep provider live trial release review-only and move to local model live guard review.",
      advancedCandidateDetails:
        "Advanced candidate details: provider live trial release candidate is review-only. Provider live trial release candidate does not route live provider traffic, provider live trial release requires explicit approval, and unresolved provider blockers stay blocked. It does not call providers, route provider traffic, send prompts, store outputs, ingest responses, persist settings, approve release, execute workflows, mutate files, mutate memory, call connectors, call local models, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildProviderLiveTrialReleaseCandidate({
      idHint: "blocked-live-routing-request",
      status: "blocked",
      providerLiveTrialCandidateIdentity:
        "Provider live trial candidate identity: provider-live-trial-release-candidate-blocked-live-routing-request.",
      liveCallGuardStatus: [
        "Live call guard status: blocked because live provider traffic cannot route from this page.",
      ],
      firstProviderTrialStatus: [
        "First provider trial status: blocked until the first provider trial remains review-only and approved elsewhere.",
      ],
      responseCaptureStatus: [
        "Response capture status: blocked until response capture remains review-only and reviewed.",
      ],
      costRateSafetyStatus: [
        "Cost rate safety status: blocked until cost, rate-limit, and safety posture are reviewed.",
      ],
      deniedProviderLivePaths: [
        "Denied provider live paths: provider calls, traffic routing, prompt sending, output storage, response ingestion, settings persistence, and release approval remain blocked.",
      ],
      unresolvedProviderBlockers: [
        "Unresolved provider blockers: unresolved provider blockers stay blocked.",
      ],
      localModelLiveGuardRoute:
        "Local model live guard route: /local-model-live-call-guard-review remains review-only.",
      localModelTrialRoute:
        "Local model trial route: /first-local-model-live-trial-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep provider live trial release blocked until explicit approval exists outside this page.",
      advancedCandidateDetails:
        "Advanced candidate details: blocked provider release candidate cannot recover by routing traffic, calling providers, persisting settings, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderLiveTrialReleaseCandidateBoundary(): ProviderLiveTrialReleaseCandidateBoundary {
  return {
    providerLiveTrialReleaseCandidateReviewOnly: true,
    providerLiveTrialReleaseCandidateDoesNotRouteLiveProviderTraffic: true,
    providerLiveTrialReleaseRequiresExplicitApproval: true,
    unresolvedProviderBlockersStayBlocked: true,
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
    settingsPersistenceAllowedFromUi: false,
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

export function summarizeProviderLiveTrialReleaseCandidate(
  model: Pick<ProviderLiveTrialReleaseCandidateModel, "candidates">
): string {
  return `Provider live trial release candidate summarizes ${model.candidates.length} provider live trial candidate posture(s). Provider live trial release candidate does not route live provider traffic, provider live trial release requires explicit approval, and unresolved provider blockers stay blocked.`;
}

export function buildProviderLiveTrialReleaseCandidateModel(): ProviderLiveTrialReleaseCandidateModel {
  const candidates = buildProviderLiveTrialReleaseCandidates();
  const model: ProviderLiveTrialReleaseCandidateModel = {
    title: "Provider live trial release candidate",
    summary: "",
    candidates,
    boundary: buildProviderLiveTrialReleaseCandidateBoundary(),
    candidateLanguage: [...PROVIDER_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Provider live trial release candidate",
      "provider live trial candidate identity",
      "Live call guard status",
      "first provider trial status",
      "response capture status",
      "Cost rate safety status",
      "denied provider live paths",
      "unresolved provider blockers",
      "local model live guard route",
      "local model trial route",
      "next recommended action",
      "Provider live trial release candidate does not route live provider traffic",
      "Provider live trial release requires explicit approval",
      "Unresolved provider blockers stay blocked",
      "advanced candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderLiveTrialReleaseCandidate(model) };
}
