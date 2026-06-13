import type {
  LocalModelLiveTrialReleaseCandidate,
  LocalModelLiveTrialReleaseCandidateBoundary,
  LocalModelLiveTrialReleaseCandidateModel,
} from "./local-model-live-trial-release-candidate-types";
import { buildLocalModelLiveTrialReleaseCandidateStableKey } from "./local-model-live-trial-release-candidate-types";

export const LOCAL_MODEL_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE = [
  "Local model live trial release candidate",
  "Local model live trial release candidate does not route live local-model traffic",
  "Local model live trial release requires explicit approval",
  "Unresolved local model blockers stay blocked",
  "Local endpoint privacy status",
  "Denied local model live paths",
] as const;

export function buildLocalModelLiveTrialReleaseCandidate(
  input: Omit<LocalModelLiveTrialReleaseCandidate, "id"> & { idHint: string }
): LocalModelLiveTrialReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildLocalModelLiveTrialReleaseCandidateStableKey(
      "local-model-live-trial-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildLocalModelLiveTrialReleaseCandidates(): LocalModelLiveTrialReleaseCandidate[] {
  return [
    buildLocalModelLiveTrialReleaseCandidate({
      idHint: "review-only-local-live-rc",
      status: "ready-for-review",
      localModelLiveTrialCandidateIdentity:
        "Local model live trial candidate identity: local-model-live-trial-release-candidate-review-only-local-live-rc.",
      liveCallGuardStatus: [
        "Live call guard status: local model live call guard review is present, review-only, and still blocks local model calls until explicit approval.",
      ],
      firstLocalModelTrialStatus: [
        "First local model trial status: first local model live trial review previews the trial without invoking local models.",
      ],
      outputCaptureStatus: [
        "Output capture status: local model live output capture review does not store model outputs and requires operator review before use.",
      ],
      localEndpointPrivacyStatus: [
        "Local endpoint privacy status: local endpoints stay private, local endpoint storage remains blocked, and raw endpoint details are never displayed.",
      ],
      deniedLocalModelLivePaths: [
        "Denied local model live paths: route live local-model traffic, call local models, invoke local models, call local bridge endpoints, probe endpoints, send prompts, store outputs, ingest outputs, persist settings, or approve release.",
        "Denied local model live paths: provider calls, connector calls, automation creation, file mutation, and memory mutation remain blocked.",
      ],
      unresolvedLocalModelBlockers: [
        "Unresolved local model blockers: missing explicit approval, unresolved endpoint privacy, unresolved prompt privacy, unresolved output capture, unresolved runtime readiness, and unresolved failover status.",
        "Unresolved local model blockers: unresolved local model blockers stay blocked.",
      ],
      connectorLiveAccessRoute:
        "Connector live access route: /connector-live-permission-trial-review reviews connector live access without calling connector APIs.",
      automationLiveGuardRoute:
        "Automation live guard route: /automation-schedule-safety-review reviews automation safety without creating schedules, watches, tasks, polling loops, or background jobs.",
      nextRecommendedAction:
        "Next recommended action: keep local model live trial release review-only, then review connector and automation live access boundaries.",
      advancedCandidateDetails:
        "Advanced candidate details: local model live trial release candidate is review-only. Local model live trial release candidate does not route live local-model traffic, local model live trial release requires explicit approval, and unresolved local model blockers stay blocked. It does not route traffic, call local models, invoke local models, call local bridge endpoints, probe endpoints, send prompts, store outputs, ingest outputs, persist settings, approve release, execute workflows, mutate files, mutate memory, call providers, call connectors, create automations, execute tools, execute agents, or create an MCP runtime.",
    }),
    buildLocalModelLiveTrialReleaseCandidate({
      idHint: "blocked-live-local-routing-request",
      status: "blocked",
      localModelLiveTrialCandidateIdentity:
        "Local model live trial candidate identity: local-model-live-trial-release-candidate-blocked-live-local-routing-request.",
      liveCallGuardStatus: [
        "Live call guard status: blocked because live local-model traffic cannot route from this page.",
      ],
      firstLocalModelTrialStatus: [
        "First local model trial status: blocked until first local model trial review stays review-only and approved elsewhere.",
      ],
      outputCaptureStatus: [
        "Output capture status: blocked until output capture remains review-only and reviewed.",
      ],
      localEndpointPrivacyStatus: [
        "Local endpoint privacy status: blocked because local endpoints stay private and no endpoint can be stored here.",
      ],
      deniedLocalModelLivePaths: [
        "Denied local model live paths: local model calls, local model invocation, bridge endpoint calls, prompt sending, output storage, output ingestion, traffic routing, settings persistence, and release approval remain blocked.",
      ],
      unresolvedLocalModelBlockers: [
        "Unresolved local model blockers: unresolved local model blockers stay blocked.",
      ],
      connectorLiveAccessRoute:
        "Connector live access route: /connector-live-permission-trial-review remains review-only.",
      automationLiveGuardRoute:
        "Automation live guard route: /automation-schedule-safety-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live local-model release blocked until explicit approval exists outside this page.",
      advancedCandidateDetails:
        "Advanced candidate details: blocked local release candidate cannot recover by routing traffic, invoking local models, calling bridge endpoints, persisting settings, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelLiveTrialReleaseCandidateBoundary(): LocalModelLiveTrialReleaseCandidateBoundary {
  return {
    localModelLiveTrialReleaseCandidateReviewOnly: true,
    localModelLiveTrialReleaseCandidateDoesNotRouteLiveLocalModelTraffic: true,
    localModelLiveTrialReleaseRequiresExplicitApproval: true,
    unresolvedLocalModelBlockersStayBlocked: true,
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
    settingsPersistenceAllowedFromUi: false,
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

export function summarizeLocalModelLiveTrialReleaseCandidate(
  model: Pick<LocalModelLiveTrialReleaseCandidateModel, "candidates">
): string {
  return `Local model live trial release candidate summarizes ${model.candidates.length} local model live trial candidate posture(s). Local model live trial release candidate does not route live local-model traffic, local model live trial release requires explicit approval, and unresolved local model blockers stay blocked.`;
}

export function buildLocalModelLiveTrialReleaseCandidateModel(): LocalModelLiveTrialReleaseCandidateModel {
  const candidates = buildLocalModelLiveTrialReleaseCandidates();
  const model: LocalModelLiveTrialReleaseCandidateModel = {
    title: "Local model live trial release candidate",
    summary: "",
    candidates,
    boundary: buildLocalModelLiveTrialReleaseCandidateBoundary(),
    candidateLanguage: [...LOCAL_MODEL_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Local model live trial release candidate",
      "local model live trial candidate identity",
      "live call guard status",
      "first local model trial status",
      "output capture status",
      "Local endpoint privacy status",
      "Denied local model live paths",
      "unresolved local model blockers",
      "connector live access route",
      "automation live guard route",
      "next recommended action",
      "Local model live trial release candidate does not route live local-model traffic",
      "Local model live trial release requires explicit approval",
      "Unresolved local model blockers stay blocked",
      "advanced candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelLiveTrialReleaseCandidate(model) };
}
