import type {
  LocalModelIntegrationReleaseCandidate,
  LocalModelIntegrationReleaseCandidateBoundary,
  LocalModelIntegrationReleaseCandidateModel,
} from "./local-model-integration-release-candidate-types";
import { buildLocalModelIntegrationReleaseCandidateStableKey } from "./local-model-integration-release-candidate-types";

export const LOCAL_MODEL_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE = [
  "Local model integration release candidate",
  "Local model integration candidate does not route live traffic",
  "Live local model routing requires explicit approval",
  "Denied local model routes remain blocked",
  "Runtime family matrix",
  "Routing policy preview",
] as const;

export function buildLocalModelIntegrationReleaseCandidate(
  input: Omit<LocalModelIntegrationReleaseCandidate, "id"> & { idHint: string }
): LocalModelIntegrationReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildLocalModelIntegrationReleaseCandidateStableKey(
      "local-model-integration-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildLocalModelIntegrationReleaseCandidates(): LocalModelIntegrationReleaseCandidate[] {
  return [
    buildLocalModelIntegrationReleaseCandidate({
      idHint: "review-only-local-integration",
      status: "ready-for-review",
      localModelIntegrationCandidateIdentity:
        "Local model integration candidate identity: local-model-integration-release-candidate-review-only-local-integration.",
      runtimeFamilyMatrix: [
        "Runtime family matrix: local chat runtime, local OpenAI-compatible runtime, local embedding runtime, local creative runtime, research support runtime, coding support runtime, and manual fallback.",
        "Runtime family matrix: every runtime family stays static and review-only; local model integration candidate does not route live traffic.",
      ],
      routingPolicyPreview: [
        "Routing policy preview: local-first private work, explicit operator approval, runtime boundary reviewed, output inbox reviewed, failover reviewed, endpoint privacy intact, credential boundary intact, and denied routes documented.",
        "Routing policy preview: policy text is advisory only and no live local model route is activated.",
      ],
      deniedLocalModelPaths: [
        "Denied local model paths: live local model routing, local model calls, local bridge endpoint calls, local endpoint probes, local tool launches, runtime switching, model retries, prompt replay, output reuse, endpoint storage, credential storage, provider fallback, connector calls, web/search calls, and GitHub calls.",
        "Denied local model paths: denied local model routes remain blocked until explicit approval happens outside this page.",
      ],
      credentialEndpointBoundaryStatus: [
        "Credential and endpoint boundary status: local endpoints, keys, tokens, credentials, private prompt details, and raw output details stay redacted and unstored.",
        "Credential and endpoint boundary status: this release candidate does not store endpoints, credentials, tokens, keys, or output content.",
      ],
      failoverStatus: [
        "Failover status: /local-model-failover-review must remain reviewed before fallback behavior can be considered.",
        "Failover status: this candidate does not switch runtimes, retry model calls, route fallback traffic, or call local models.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: missing runtime boundary approval, missing output review, missing failover review, endpoint exposure, credential exposure, local bridge call, live routing request, prompt send, output persistence, file mutation, memory mutation, and background polling.",
        "Blocked integration risks: live local model routing requires explicit approval and cannot start here.",
      ],
      creativeProviderTrialRoute:
        "Creative provider trial route: /creative-local-bridge-real-world-trial-review reviews creative/local bridge trials without launching tools.",
      researchProviderTrialRoute:
        "Research provider trial route: /research-loop-real-world-trial-review reviews research workflow trials without browsing or provider calls.",
      nextRecommendedAction:
        "Next recommended action: keep local model integration review-only, confirm runtime boundary, output inbox, failover, creative trial, and research trial posture, then prepare an approval packet outside this page.",
      advancedIntegrationCandidateDetails:
        "Advanced integration candidate details: local model integration release candidate is review-only. Local model integration candidate does not route live traffic, live local model routing requires explicit approval, and denied local model routes remain blocked. It does not route traffic, call local models, call local bridge endpoints, probe local endpoints, launch local tools, switch runtimes, retry model calls, send prompts to models, store model outputs, ingest model outputs, call provider APIs, call OpenAI-compatible providers, test provider connections, route provider traffic, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/endpoint/output data without approval, store endpoints, store tokens, store credentials, display secrets, print process.env, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalModelIntegrationReleaseCandidate({
      idHint: "blocked-live-routing-request",
      status: "blocked",
      localModelIntegrationCandidateIdentity:
        "Local model integration candidate identity: local-model-integration-release-candidate-blocked-live-routing-request.",
      runtimeFamilyMatrix: [
        "Runtime family matrix: blocked when a request asks this page to route live local model traffic.",
      ],
      routingPolicyPreview: [
        "Routing policy preview: blocked because no local model route is activated from this release candidate.",
      ],
      deniedLocalModelPaths: [
        "Denied local model paths: live local routing, model calls, bridge endpoint calls, endpoint probes, runtime switching, model retries, prompt replay, output storage, and credential use remain blocked.",
      ],
      credentialEndpointBoundaryStatus: [
        "Credential and endpoint boundary status: blocked until endpoint and credential boundaries remain redacted and approved elsewhere.",
      ],
      failoverStatus: [
        "Failover status: blocked until local model failover review remains explicit and approved elsewhere.",
      ],
      blockedIntegrationRisks: [
        "Blocked integration risks: unapproved local model traffic and missing safety evidence remain blocked.",
      ],
      creativeProviderTrialRoute:
        "Creative provider trial route: /creative-local-bridge-real-world-trial-review remains review-only.",
      researchProviderTrialRoute:
        "Research provider trial route: /research-loop-real-world-trial-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live local routing blocked until explicit operator approval is provided outside this page.",
      advancedIntegrationCandidateDetails:
        "Advanced integration candidate details: blocked integration cannot recover by routing traffic, calling local models, calling bridge endpoints, storing endpoints, storing outputs, switching runtimes, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelIntegrationReleaseCandidateBoundary(): LocalModelIntegrationReleaseCandidateBoundary {
  return {
    localModelIntegrationReleaseCandidateReviewOnly: true,
    localModelIntegrationCandidateDoesNotRouteLiveTraffic: true,
    liveLocalModelRoutingRequiresExplicitApproval: true,
    deniedLocalModelRoutesRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localModelTrafficAllowedFromUi: false,
    localModelTrafficRoutingAllowedFromUi: false,
    localModelLiveConnectionTestsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localEndpointProbeExecutionAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    runtimeSwitchingAllowedFromUi: false,
    modelRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    modelOutputStorageAllowedFromUi: false,
    modelOutputIngestionAllowedFromUi: false,
    endpointStorageAllowed: false,
    credentialStorageAllowed: false,
    tokenStorageAllowed: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelEndpointOutputDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalModelIntegrationReleaseCandidate(
  model: Pick<LocalModelIntegrationReleaseCandidateModel, "candidates">
): string {
  return `Local model integration release candidate prepares ${model.candidates.length} integration candidate posture(s). Local model integration candidate does not route live traffic, live local model routing requires explicit approval, and denied local model routes remain blocked.`;
}

export function buildLocalModelIntegrationReleaseCandidateModel(): LocalModelIntegrationReleaseCandidateModel {
  const candidates = buildLocalModelIntegrationReleaseCandidates();
  const model: LocalModelIntegrationReleaseCandidateModel = {
    title: "Local model integration release candidate",
    summary: "",
    candidates,
    boundary: buildLocalModelIntegrationReleaseCandidateBoundary(),
    integrationCandidateLanguage: [...LOCAL_MODEL_INTEGRATION_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Local model integration release candidate",
      "local model integration candidate identity",
      "Runtime family matrix",
      "Routing policy preview",
      "Denied local model paths",
      "Credential and endpoint boundary status",
      "Failover status",
      "Blocked integration risks",
      "Creative provider trial route",
      "Research provider trial route",
      "Next recommended action",
      "Local model integration candidate does not route live traffic",
      "Live local model routing requires explicit approval",
      "Denied local model routes remain blocked",
      "advanced integration candidate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelIntegrationReleaseCandidate(model) };
}
