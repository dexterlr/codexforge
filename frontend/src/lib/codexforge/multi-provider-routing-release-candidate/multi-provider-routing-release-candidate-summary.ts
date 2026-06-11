import type {
  MultiProviderRoutingReleaseCandidate,
  MultiProviderRoutingReleaseCandidateBoundary,
  MultiProviderRoutingReleaseCandidateModel,
} from "./multi-provider-routing-release-candidate-types";
import { buildMultiProviderRoutingReleaseCandidateStableKey } from "./multi-provider-routing-release-candidate-types";

export const MULTI_PROVIDER_ROUTING_RELEASE_CANDIDATE_LANGUAGE = [
  "Multi-provider routing release candidate",
  "Multi-provider routing candidate does not route live traffic",
  "Live provider routing requires explicit approval",
  "Denied provider routes remain blocked",
  "Provider family matrix",
  "Routing policy preview",
] as const;

export function buildMultiProviderRoutingReleaseCandidate(
  input: Omit<MultiProviderRoutingReleaseCandidate, "id"> & { idHint: string }
): MultiProviderRoutingReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildMultiProviderRoutingReleaseCandidateStableKey(
      "multi-provider-routing-release-candidate",
      idHint,
      input.status
    ),
    ...candidate,
  };
}

export function buildMultiProviderRoutingReleaseCandidates(): MultiProviderRoutingReleaseCandidate[] {
  return [
    buildMultiProviderRoutingReleaseCandidate({
      idHint: "review-only-routing-readiness",
      status: "ready-for-review",
      multiProviderRoutingReleaseCandidateIdentity:
        "Multi-provider routing release candidate identity: multi-provider-routing-release-candidate-review-only-routing-readiness.",
      providerFamilyMatrix: [
        "Provider family matrix: OpenAI-compatible remote providers, local model providers, approved creative providers, research/coding providers, connector-adjacent providers, and manual fallback.",
        "Provider family matrix: every provider family stays static and review-only; multi-provider routing candidate does not route live traffic.",
      ],
      routingPolicyPreview: [
        "Routing policy preview: local-first private work, remote provider approval required, credential boundary required, failover policy required, budget guardrail required, prompt privacy required, and manual fallback for unresolved risks.",
        "Routing policy preview: policy text is advisory only and no live route is activated.",
      ],
      deniedRoutingPaths: [
        "Denied routing paths: live provider routing, provider API calls, OpenAI-compatible API calls, local model calls, provider connection tests, provider switching, retry calls, prompt replay, file replay, credential reuse, connector calls, web/search calls, and GitHub calls.",
        "Denied routing paths: denied provider routes remain blocked until explicit approval happens outside this page.",
      ],
      credentialBoundaryStatus: [
        "Credential boundary status: /remote-provider-credential-boundary-review must remain reviewed, redacted, unstored, and approved before any future route can use credentials.",
        "Credential boundary status: this release candidate does not store credentials, tokens, endpoints, keys, or secrets.",
      ],
      failoverStatus: [
        "Failover status: /provider-failover-policy-review must remain reviewed before fallback behavior can be considered.",
        "Failover status: this release candidate does not switch providers, retry provider calls, or route fallback traffic.",
      ],
      blockedRoutingRisks: [
        "Blocked routing risks: missing provider approval, missing credential boundary, unsafe fallback, provider connection request, token spending, prompt/file/project data send, local bridge call, connector call, background polling, file mutation, and memory mutation.",
        "Blocked routing risks: live provider routing requires explicit approval and cannot start here.",
      ],
      firstControlledProviderTrialRoute:
        "First controlled provider trial route: /openai-compatible-provider-trial-review reviews the first OpenAI-compatible provider lane without sending provider traffic.",
      providerResponseReviewRoute:
        "Provider response review route: /provider-test-results remains the review-only place to inspect future approved test outcomes.",
      nextRecommendedAction:
        "Next recommended action: keep routing review-only, confirm credential boundary and failover policy, then prepare an approval packet outside this page.",
      advancedRoutingDetails:
        "Advanced routing details: multi-provider routing release candidate is review-only. Multi-provider routing candidate does not route live traffic, live provider routing requires explicit approval, and denied provider routes remain blocked. It does not route traffic, call providers, call OpenAI-compatible providers, connect providers, test provider connections, switch providers, retry provider calls, spend tokens, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential data without approval, store credentials, store endpoints, store tokens, write browser storage, print process.env, display secrets, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildMultiProviderRoutingReleaseCandidate({
      idHint: "blocked-live-routing-request",
      status: "blocked",
      multiProviderRoutingReleaseCandidateIdentity:
        "Multi-provider routing release candidate identity: multi-provider-routing-release-candidate-blocked-live-routing-request.",
      providerFamilyMatrix: [
        "Provider family matrix: blocked when a request asks this page to route live provider traffic.",
      ],
      routingPolicyPreview: [
        "Routing policy preview: blocked because no provider route is activated from this release candidate.",
      ],
      deniedRoutingPaths: [
        "Denied routing paths: live provider routing, provider calls, local model calls, credential use, retry calls, and provider switching remain blocked.",
      ],
      credentialBoundaryStatus: [
        "Credential boundary status: blocked until credential boundary review remains redacted and approved elsewhere.",
      ],
      failoverStatus: [
        "Failover status: blocked until failover policy review remains explicit and approved elsewhere.",
      ],
      blockedRoutingRisks: [
        "Blocked routing risks: unapproved provider traffic and missing safety evidence remain blocked.",
      ],
      firstControlledProviderTrialRoute:
        "First controlled provider trial route: /openai-compatible-provider-trial-review remains review-only.",
      providerResponseReviewRoute:
        "Provider response review route: /provider-test-results remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep live routing blocked until explicit operator approval is provided outside this page.",
      advancedRoutingDetails:
        "Advanced routing details: blocked multi-provider routing cannot recover by routing traffic, calling providers, storing credentials, switching providers, writing files, or mutating memory.",
    }),
  ];
}

export function buildMultiProviderRoutingReleaseCandidateBoundary(): MultiProviderRoutingReleaseCandidateBoundary {
  return {
    multiProviderRoutingReleaseCandidateReviewOnly: true,
    multiProviderRoutingCandidateDoesNotRouteLiveTraffic: true,
    liveProviderRoutingRequiresExplicitApproval: true,
    deniedProviderRoutesRemainBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelCredentialDataAutoSendAllowed: false,
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
    credentialStorageAllowed: false,
    endpointStorageAllowed: false,
    tokenStorageAllowed: false,
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

export function summarizeMultiProviderRoutingReleaseCandidate(
  model: Pick<MultiProviderRoutingReleaseCandidateModel, "candidates">
): string {
  return `Multi-provider routing release candidate prepares ${model.candidates.length} routing candidate posture(s). Multi-provider routing candidate does not route live traffic, live provider routing requires explicit approval, and denied provider routes remain blocked.`;
}

export function buildMultiProviderRoutingReleaseCandidateModel(): MultiProviderRoutingReleaseCandidateModel {
  const candidates = buildMultiProviderRoutingReleaseCandidates();
  const model: MultiProviderRoutingReleaseCandidateModel = {
    title: "Multi-provider routing release candidate",
    summary: "",
    candidates,
    boundary: buildMultiProviderRoutingReleaseCandidateBoundary(),
    routingLanguage: [...MULTI_PROVIDER_ROUTING_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Multi-provider routing release candidate",
      "multi-provider routing release candidate identity",
      "Provider family matrix",
      "Routing policy preview",
      "Denied routing paths",
      "Credential boundary status",
      "Failover status",
      "Blocked routing risks",
      "First controlled provider trial route",
      "Provider response review route",
      "Next recommended action",
      "Multi-provider routing candidate does not route live traffic",
      "Live provider routing requires explicit approval",
      "Denied provider routes remain blocked",
      "advanced routing details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeMultiProviderRoutingReleaseCandidate(model) };
}
