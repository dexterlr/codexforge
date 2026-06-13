import type {
  ConnectorLiveTrialReleaseCandidate,
  ConnectorLiveTrialReleaseCandidateBoundary,
  ConnectorLiveTrialReleaseCandidateModel,
} from "./connector-live-trial-release-candidate-types";
import { buildConnectorLiveTrialReleaseCandidateStableKey } from "./connector-live-trial-release-candidate-types";

export const CONNECTOR_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE = [
  "Connector live trial release candidate",
  "Connector live trial release candidate does not call connector APIs",
  "Connector live trial release requires explicit approval",
  "Unresolved connector blockers stay blocked",
  "Live access guard status",
  "Redaction privacy status",
] as const;

export function buildConnectorLiveTrialReleaseCandidate(
  input: Omit<ConnectorLiveTrialReleaseCandidate, "id"> & { idHint: string }
): ConnectorLiveTrialReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildConnectorLiveTrialReleaseCandidateStableKey(
      "connector-live-trial-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildConnectorLiveTrialReleaseCandidates(): ConnectorLiveTrialReleaseCandidate[] {
  return [
    buildConnectorLiveTrialReleaseCandidate({
      idHint: "review-only-connector-live-rc",
      status: "ready-for-review",
      connectorLiveTrialCandidateIdentity:
        "Connector live trial candidate identity: connector-live-trial-release-candidate-review-only-connector-live-rc.",
      liveAccessGuardStatus: [
        "Live access guard status: connector live access guard review is present, review-only, and blocks connector access until explicit approval.",
      ],
      firstConnectorTrialStatus: [
        "First connector trial status: first connector live access trial review previews trial stages without fetching connector data.",
      ],
      evidenceCaptureStatus: [
        "Evidence capture status: connector live evidence capture review does not ingest connector evidence automatically and keeps evidence review-before-use.",
      ],
      redactionPrivacyStatus: [
        "Redaction privacy status: private connector data and private connector evidence stay redacted, unfetched, and unstored.",
      ],
      deniedConnectorLivePaths: [
        "Denied connector live paths: call connector APIs, connect accounts, fetch connector data, store connector data, persist permissions, ingest evidence, send connector data to providers, or approve release.",
        "Denied connector live paths: run workflows, call providers, call local models, call local bridge endpoints, create automations, mutate files, mutate memory, execute tools, execute agents, or create MCP runtimes.",
      ],
      unresolvedConnectorBlockers: [
        "Unresolved connector blockers: missing explicit approval, unresolved minimum scope, unresolved privacy redaction, unresolved evidence review, unresolved source citation, and unresolved automation handoff.",
        "Unresolved connector blockers: unresolved connector blockers stay blocked.",
      ],
      automationLiveGuardRoute:
        "Automation live guard route: /automation-live-execution-guard-review prepares automation execution guardrails without running automations.",
      automationDryRunReplayRoute:
        "Automation dry-run replay route: /first-automation-live-dry-run-replay replays automation plans in review mode without creating or executing automation.",
      nextRecommendedAction:
        "Next recommended action: keep connector live trial release review-only and move to automation live execution guard review.",
      advancedCandidateDetails:
        "Advanced candidate details: connector live trial release candidate is review-only. Connector live trial release candidate does not call connector APIs, connector live trial release requires explicit approval, and unresolved connector blockers stay blocked. It does not call connectors, connect accounts, fetch connector data, store connector data, persist permissions, ingest evidence, send connector data to providers, call providers, send prompts, store outputs, call local models, call local bridge endpoints, execute workflows, create automations, run automations, create schedules, create reminders, create watches, create background jobs, start polling loops, send notifications, approve actions, persist approval decisions, mutate files, write files, export files, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildConnectorLiveTrialReleaseCandidate({
      idHint: "blocked-live-connector-call",
      status: "blocked",
      connectorLiveTrialCandidateIdentity:
        "Connector live trial candidate identity: connector-live-trial-release-candidate-blocked-live-connector-call.",
      liveAccessGuardStatus: [
        "Live access guard status: blocked because live connector calls cannot run from this page.",
      ],
      firstConnectorTrialStatus: [
        "First connector trial status: blocked until trial review remains review-only and explicitly approved elsewhere.",
      ],
      evidenceCaptureStatus: [
        "Evidence capture status: blocked until evidence capture remains review-before-use with no automatic ingestion.",
      ],
      redactionPrivacyStatus: [
        "Redaction privacy status: blocked until private connector evidence stays redacted.",
      ],
      deniedConnectorLivePaths: [
        "Denied connector live paths: connector API calls, connector data fetch, connector data storage, permission persistence, release approval, provider send, and memory mutation remain blocked.",
      ],
      unresolvedConnectorBlockers: [
        "Unresolved connector blockers: unresolved connector blockers stay blocked.",
      ],
      automationLiveGuardRoute:
        "Automation live guard route: /automation-live-execution-guard-review remains review-only.",
      automationDryRunReplayRoute:
        "Automation dry-run replay route: /first-automation-live-dry-run-replay remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep connector live trial release blocked until explicit approval exists outside this page.",
      advancedCandidateDetails:
        "Advanced candidate details: blocked connector release cannot recover by calling connector APIs, fetching connector data, storing connector data, persisting permissions, ingesting evidence, or approving release automatically.",
    }),
  ];
}

export function buildConnectorLiveTrialReleaseCandidateBoundary(): ConnectorLiveTrialReleaseCandidateBoundary {
  return {
    connectorLiveTrialReleaseCandidateReviewOnly: true,
    connectorLiveTrialReleaseCandidateDoesNotCallConnectorApis: true,
    connectorLiveTrialReleaseRequiresExplicitApproval: true,
    unresolvedConnectorBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    approvalDecisionPersistenceAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    connectorDataFetchAllowedFromUi: false,
    connectorDataStorageAllowedFromUi: false,
    connectorPermissionPersistenceAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    connectorEvidenceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowedFromUi: false,
    evidenceSentToProvidersAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerOutputStorageAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    automationExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    automationRulePersistenceAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    conditionalWatchCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    creativeAssetGenerationAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    webSearchApiCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
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

export function summarizeConnectorLiveTrialReleaseCandidate(
  model: Pick<ConnectorLiveTrialReleaseCandidateModel, "candidates">
): string {
  return `Connector live trial release candidate summarizes ${model.candidates.length} connector live trial candidate posture(s). Connector live trial release candidate does not call connector APIs, connector live trial release requires explicit approval, and unresolved connector blockers stay blocked.`;
}

export function buildConnectorLiveTrialReleaseCandidateModel(): ConnectorLiveTrialReleaseCandidateModel {
  const candidates = buildConnectorLiveTrialReleaseCandidates();
  const model: ConnectorLiveTrialReleaseCandidateModel = {
    title: "Connector live trial release candidate",
    summary: "",
    candidates,
    boundary: buildConnectorLiveTrialReleaseCandidateBoundary(),
    candidateLanguage: [...CONNECTOR_LIVE_TRIAL_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Connector live trial release candidate",
      "connector live trial candidate identity",
      "Live access guard status",
      "first connector trial status",
      "evidence capture status",
      "Redaction privacy status",
      "denied connector live paths",
      "unresolved connector blockers",
      "automation live guard route",
      "automation dry-run replay route",
      "next recommended action",
      "Connector live trial release candidate does not call connector APIs",
      "Connector live trial release requires explicit approval",
      "Unresolved connector blockers stay blocked",
      "advanced candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeConnectorLiveTrialReleaseCandidate(model) };
}
