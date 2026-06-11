import type {
  ProviderFailoverPolicyReview,
  ProviderFailoverPolicyReviewBoundary,
  ProviderFailoverPolicyReviewModel,
} from "./provider-failover-policy-review-types";
import { buildProviderFailoverPolicyReviewStableKey } from "./provider-failover-policy-review-types";

export const PROVIDER_FAILOVER_POLICY_REVIEW_LANGUAGE = [
  "Provider failover policy review",
  "Failover policy review does not switch providers",
  "Failover requires explicit operator approval",
  "Unsafe fallback shortcuts stay blocked",
  "Failure categories",
  "Fallback policy preview",
] as const;

export function buildProviderFailoverPolicyReview(
  input: Omit<ProviderFailoverPolicyReview, "id"> & { idHint: string }
): ProviderFailoverPolicyReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderFailoverPolicyReviewStableKey("provider-failover-policy-review", idHint, input.status),
    ...review,
  };
}

export function buildProviderFailoverPolicyReviews(): ProviderFailoverPolicyReview[] {
  return [
    buildProviderFailoverPolicyReview({
      idHint: "remote-provider-fallback-review",
      status: "ready-for-review",
      failoverPolicyIdentity:
        "Failover policy identity: provider-failover-policy-review-remote-provider-fallback-review.",
      failureCategories: [
        "Failure categories: unavailable provider, authentication failure, quota limit, rate limit, timeout, unsupported model capability, privacy mismatch, policy denial, malformed response, and manual operator hold.",
        "Failure categories: categories are reviewed as labels only; failover policy review does not switch providers.",
      ],
      fallbackPolicyPreview: [
        "Fallback policy preview: manual review is the default fallback when approval, credential boundary, privacy classification, budget, or route evidence is missing.",
        "Fallback policy preview: no fallback route is activated and no provider traffic is routed from this page.",
      ],
      retryBackoffReview: [
        "Retry/backoff review: retry count, cooldown language, budget guardrails, user-visible evidence, and stop conditions are reviewed without retrying provider calls.",
        "Retry/backoff review: provider retry calls remain blocked until explicit approval exists outside this review.",
      ],
      deniedFailoverShortcuts: [
        "Denied failover shortcuts: silent provider switching, automatic retry loops, credential reuse, endpoint substitution, local model fallback, connector fallback, prompt replay, file replay, and budget bypass.",
        "Denied failover shortcuts: unsafe fallback shortcuts stay blocked even when a failure category is understood.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: operator-visible reason, original provider family, blocked data class, credential boundary status, retry policy, manual approval owner, and result capture route.",
        "Validation evidence requirements: evidence can be reviewed but not produced by live provider calls from this UI.",
      ],
      blockedFailoverRisks: [
        "Blocked failover risks: unapproved provider switch, live traffic routing, provider retry calls, prompt replay, credential exposure, local bridge call, project data send, file mutation, memory mutation, and background polling.",
        "Blocked failover risks: failover requires explicit operator approval and cannot start here.",
      ],
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate reviews routing readiness without routing live traffic.",
      credentialBoundaryRoute:
        "Credential boundary route: /remote-provider-credential-boundary-review reviews credentials without storing credentials.",
      nextRecommendedAction:
        "Next recommended action: review credential boundary status, then review multi-provider routing RC before any future failover approval packet.",
      advancedFailoverDetails:
        "Advanced failover details: provider failover policy review is review-only. Failover policy review does not switch providers, failover requires explicit operator approval, and unsafe fallback shortcuts stay blocked. It does not switch providers, route provider traffic, retry provider calls, call provider APIs, call OpenAI-compatible providers, test provider connections, connect providers, spend tokens, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential data without approval, store credentials, store endpoints, store tokens, write browser storage, print process.env, display secrets, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderFailoverPolicyReview({
      idHint: "blocked-provider-switch-request",
      status: "blocked",
      failoverPolicyIdentity:
        "Failover policy identity: provider-failover-policy-review-blocked-provider-switch-request.",
      failureCategories: [
        "Failure categories: blocked when a request asks this page to switch providers, retry provider calls, or route fallback traffic.",
      ],
      fallbackPolicyPreview: [
        "Fallback policy preview: blocked because fallback stays manual until explicit operator approval exists.",
      ],
      retryBackoffReview: [
        "Retry/backoff review: blocked because retry calls cannot run from this page.",
      ],
      deniedFailoverShortcuts: [
        "Denied failover shortcuts: provider switching, retry loops, prompt replay, and credential reuse remain blocked.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: blocked because live evidence cannot be generated from provider calls here.",
      ],
      blockedFailoverRisks: [
        "Blocked failover risks: unapproved fallback traffic and provider switching remain blocked.",
      ],
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate remains review-only.",
      credentialBoundaryRoute:
        "Credential boundary route: /remote-provider-credential-boundary-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep failover blocked until credential boundary and routing RC reviews are complete.",
      advancedFailoverDetails:
        "Advanced failover details: blocked failover cannot recover by switching providers, retrying calls, routing traffic, storing credentials, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderFailoverPolicyReviewBoundary(): ProviderFailoverPolicyReviewBoundary {
  return {
    providerFailoverPolicyReviewOnly: true,
    failoverPolicyReviewDoesNotSwitchProviders: true,
    failoverRequiresExplicitOperatorApproval: true,
    unsafeFallbackShortcutsStayBlocked: true,
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

export function summarizeProviderFailoverPolicyReview(
  model: Pick<ProviderFailoverPolicyReviewModel, "reviews">
): string {
  return `Provider failover policy review prepares ${model.reviews.length} failover posture(s). Failover policy review does not switch providers, failover requires explicit operator approval, and unsafe fallback shortcuts stay blocked.`;
}

export function buildProviderFailoverPolicyReviewModel(): ProviderFailoverPolicyReviewModel {
  const reviews = buildProviderFailoverPolicyReviews();
  const model: ProviderFailoverPolicyReviewModel = {
    title: "Provider failover policy review",
    summary: "",
    reviews,
    boundary: buildProviderFailoverPolicyReviewBoundary(),
    failoverLanguage: [...PROVIDER_FAILOVER_POLICY_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider failover policy review",
      "failover policy identity",
      "Failure categories",
      "Fallback policy preview",
      "Retry/backoff review",
      "Denied failover shortcuts",
      "Validation evidence requirements",
      "Blocked failover risks",
      "Multi-provider routing route",
      "Credential boundary route",
      "Next recommended action",
      "Failover policy review does not switch providers",
      "Failover requires explicit operator approval",
      "Unsafe fallback shortcuts stay blocked",
      "advanced failover details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderFailoverPolicyReview(model) };
}
