import type {
  OpenAICompatibleProviderTrialReview,
  OpenAICompatibleProviderTrialReviewBoundary,
  OpenAICompatibleProviderTrialReviewModel,
} from "./openai-compatible-provider-trial-review-types";
import { buildOpenAICompatibleProviderTrialReviewStableKey } from "./openai-compatible-provider-trial-review-types";

export const OPENAI_COMPATIBLE_PROVIDER_TRIAL_REVIEW_LANGUAGE = [
  "OpenAI-compatible provider trial review",
  "OpenAI-compatible provider trial does not send provider traffic",
  "Provider trial requires explicit operator approval",
  "Credentials and endpoints stay private",
  "Provider lane groups",
  "Endpoint compatibility notes",
] as const;

export function buildOpenAICompatibleProviderTrialReview(
  input: Omit<OpenAICompatibleProviderTrialReview, "id"> & { idHint: string }
): OpenAICompatibleProviderTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildOpenAICompatibleProviderTrialReviewStableKey(
      "openai-compatible-provider-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildOpenAICompatibleProviderTrialReviews(): OpenAICompatibleProviderTrialReview[] {
  return [
    buildOpenAICompatibleProviderTrialReview({
      idHint: "first-remote-lane-review",
      status: "ready-for-review",
      openAICompatibleProviderTrialIdentity:
        "OpenAI-compatible provider trial identity: openai-compatible-provider-trial-review-first-remote-lane-review.",
      providerLaneGroups: [
        "Provider lane groups: OpenAI-compatible remote providers, local OpenAI-compatible servers, future approved hosted models, and manual fallback review.",
        "Provider lane groups: every lane is a static review lane only; OpenAI-compatible provider trial does not send provider traffic.",
      ],
      modelCapabilityPreview: [
        "Model capability preview: chat, tool-call shape, embeddings, streaming compatibility, JSON-mode behavior, token budget, and privacy classification are reviewed as labels only.",
        "Model capability preview: capability labels do not test a connection, call an API, spend tokens, or route traffic.",
      ],
      endpointCompatibilityNotes: [
        "Endpoint compatibility notes: base URL, chat completions shape, model naming, headers, timeout policy, and response metadata are reviewed without storing endpoint values.",
        "Endpoint compatibility notes: credentials and endpoints stay private and are not displayed, persisted, echoed, tested, or sent.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: operator approval is required before any provider connection, provider test, endpoint use, credential handling, model request, retry, failover, or routing decision.",
        "Approval gate checklist: provider trial requires explicit operator approval and approval is not granted from this page.",
      ],
      deniedProviderActions: [
        "Denied provider actions: provider connection, provider API call, OpenAI-compatible API call, live connection test, provider traffic routing, provider switching, retry calls, local model calls, local bridge calls, connector calls, web/search calls, GitHub calls, and token spending.",
        "Denied provider actions: prompt/file/project/connector/provider/model/credential data is not sent without approval.",
      ],
      blockedTrialRisks: [
        "Blocked trial risks: unapproved endpoint use, exposed credential handling, raw secret display, token storage, provider fallback shortcuts, local bridge calls, project data sends, workflow execution, file mutation, and memory mutation.",
        "Blocked trial risks: blocked risks stay blocked until a separate approval route resolves them.",
      ],
      credentialBoundaryRoute:
        "Credential boundary route: /remote-provider-credential-boundary-review reviews remote provider credential boundaries without storing credentials.",
      failoverPolicyRoute:
        "Failover policy route: /provider-failover-policy-review reviews failover behavior without switching providers.",
      nextRecommendedAction:
        "Next recommended action: review credential boundary rules, then review failover policy before any future OpenAI-compatible provider approval packet.",
      advancedProviderTrialDetails:
        "Advanced provider trial details: OpenAI-compatible provider trial review is review-only. OpenAI-compatible provider trial does not send provider traffic, provider trial requires explicit operator approval, and credentials and endpoints stay private. It does not connect providers, test provider connections, call provider APIs, call OpenAI-compatible providers, route live provider traffic, switch providers, retry provider calls, spend tokens, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential data without approval, store credentials, store endpoints, store tokens, write browser storage, print process.env, display secrets, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildOpenAICompatibleProviderTrialReview({
      idHint: "blocked-provider-send-request",
      status: "blocked",
      openAICompatibleProviderTrialIdentity:
        "OpenAI-compatible provider trial identity: openai-compatible-provider-trial-review-blocked-provider-send-request.",
      providerLaneGroups: [
        "Provider lane groups: blocked when a request asks this page to connect, test, or send traffic to an OpenAI-compatible provider.",
      ],
      modelCapabilityPreview: [
        "Model capability preview: blocked because capabilities cannot be tested from this review surface.",
      ],
      endpointCompatibilityNotes: [
        "Endpoint compatibility notes: blocked because endpoint values stay private and unstored.",
      ],
      approvalGateChecklist: [
        "Approval gate checklist: blocked because explicit operator approval is missing.",
      ],
      deniedProviderActions: [
        "Denied provider actions: provider calls, connection tests, retries, routing, provider switching, credential storage, and prompt sends remain blocked.",
      ],
      blockedTrialRisks: [
        "Blocked trial risks: unapproved provider traffic and credential exposure stay blocked.",
      ],
      credentialBoundaryRoute:
        "Credential boundary route: /remote-provider-credential-boundary-review remains review-only.",
      failoverPolicyRoute:
        "Failover policy route: /provider-failover-policy-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the provider lane blocked until credential and failover reviews are complete.",
      advancedProviderTrialDetails:
        "Advanced provider trial details: blocked OpenAI-compatible provider trial cannot recover by calling providers, testing connections, routing traffic, storing credentials, displaying endpoints, writing files, or mutating memory.",
    }),
  ];
}

export function buildOpenAICompatibleProviderTrialReviewBoundary(): OpenAICompatibleProviderTrialReviewBoundary {
  return {
    openAICompatibleProviderTrialReviewOnly: true,
    openAICompatibleProviderTrialDoesNotSendProviderTraffic: true,
    providerTrialRequiresExplicitOperatorApproval: true,
    credentialsAndEndpointsStayPrivate: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
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

export function summarizeOpenAICompatibleProviderTrialReview(
  model: Pick<OpenAICompatibleProviderTrialReviewModel, "reviews">
): string {
  return `OpenAI-compatible provider trial review prepares ${model.reviews.length} provider trial posture(s). OpenAI-compatible provider trial does not send provider traffic, provider trial requires explicit operator approval, and credentials and endpoints stay private.`;
}

export function buildOpenAICompatibleProviderTrialReviewModel(): OpenAICompatibleProviderTrialReviewModel {
  const reviews = buildOpenAICompatibleProviderTrialReviews();
  const model: OpenAICompatibleProviderTrialReviewModel = {
    title: "OpenAI-compatible provider trial review",
    summary: "",
    reviews,
    boundary: buildOpenAICompatibleProviderTrialReviewBoundary(),
    trialLanguage: [...OPENAI_COMPATIBLE_PROVIDER_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "OpenAI-compatible provider trial review",
      "OpenAI-compatible provider trial identity",
      "Provider lane groups",
      "Model capability preview",
      "Endpoint compatibility notes",
      "Approval gate checklist",
      "Denied provider actions",
      "Blocked trial risks",
      "Credential boundary route",
      "Failover policy route",
      "Next recommended action",
      "OpenAI-compatible provider trial does not send provider traffic",
      "Provider trial requires explicit operator approval",
      "Credentials and endpoints stay private",
      "advanced provider trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeOpenAICompatibleProviderTrialReview(model) };
}
