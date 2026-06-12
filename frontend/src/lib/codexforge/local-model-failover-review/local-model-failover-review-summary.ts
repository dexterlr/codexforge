import type {
  LocalModelFailoverReview,
  LocalModelFailoverReviewBoundary,
  LocalModelFailoverReviewModel,
} from "./local-model-failover-review-types";
import { buildLocalModelFailoverReviewStableKey } from "./local-model-failover-review-types";

export const LOCAL_MODEL_FAILOVER_REVIEW_LANGUAGE = [
  "Local model failover review",
  "Local model failover review does not switch runtimes",
  "Local model failover requires explicit operator approval",
  "Unsafe fallback shortcuts stay blocked",
  "Failure categories",
  "Fallback policy preview",
] as const;

export function buildLocalModelFailoverReview(
  input: Omit<LocalModelFailoverReview, "id"> & { idHint: string }
): LocalModelFailoverReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalModelFailoverReviewStableKey("local-model-failover-review", idHint, input.status),
    ...review,
  };
}

export function buildLocalModelFailoverReviews(): LocalModelFailoverReview[] {
  return [
    buildLocalModelFailoverReview({
      idHint: "review-only-local-fallback",
      status: "ready-for-review",
      localModelFailoverIdentity:
        "Local model failover identity: local-model-failover-review-review-only-local-fallback.",
      failureCategories: [
        "Failure categories: runtime unavailable, local bridge unavailable, model not loaded, capability mismatch, privacy mismatch, prompt redaction required, output unsafe, timeout, malformed output, endpoint boundary unclear, and manual operator hold.",
        "Failure categories: categories are reviewed as labels only; local model failover review does not switch runtimes.",
      ],
      fallbackPolicyPreview: [
        "Fallback policy preview: manual review is the default fallback when approval, privacy class, endpoint boundary, output handling, runtime family, or local bridge evidence is missing.",
        "Fallback policy preview: no runtime is selected, no traffic is routed, and no model call is attempted from this page.",
      ],
      retryBackoffReview: [
        "Retry/backoff review: retry count, cooldown language, stop condition, output review dependency, endpoint privacy note, and operator-visible reason are reviewed without retrying model calls.",
        "Retry/backoff review: model retry calls remain blocked until explicit operator approval exists outside this review.",
      ],
      deniedFailoverShortcuts: [
        "Denied failover shortcuts: silent runtime switching, automatic retry loops, local bridge probing, endpoint substitution, prompt replay, output reuse, credential reuse, provider fallback, connector fallback, file replay, and background polling.",
        "Denied failover shortcuts: unsafe fallback shortcuts stay blocked even when a failure category is understood.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: operator-visible reason, original runtime family, blocked data class, local bridge dependency, endpoint privacy status, output review status, retry policy, manual approval owner, and result review route.",
        "Validation evidence requirements: evidence can be reviewed but not produced by live model calls, local probes, or endpoint checks from this UI.",
      ],
      blockedFailoverRisks: [
        "Blocked failover risks: unapproved runtime switch, local model traffic routing, retry loop, prompt replay, output persistence, endpoint exposure, credential exposure, local bridge call, file mutation, memory mutation, and background polling.",
        "Blocked failover risks: local model failover requires explicit operator approval and cannot start here.",
      ],
      integrationCandidateRoute:
        "Integration candidate route: /local-model-integration-release-candidate reviews integration readiness without routing live traffic.",
      outputInboxRoute:
        "Output inbox route: /local-model-output-review-inbox reviews local model outputs without storing outputs.",
      nextRecommendedAction:
        "Next recommended action: review output handling, then review the local model integration release candidate before any failover approval packet.",
      advancedFailoverDetails:
        "Advanced failover details: local model failover review is review-only. Local model failover review does not switch runtimes, local model failover requires explicit operator approval, and unsafe fallback shortcuts stay blocked. It does not switch runtimes, call local models, retry model calls, route local model traffic, call local bridge endpoints, probe local endpoints, launch local tools, send prompts to models, store model outputs, ingest model outputs, call provider APIs, call OpenAI-compatible providers, test provider connections, route provider traffic, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/endpoint/output data without approval, store endpoints, store tokens, store credentials, display secrets, print process.env, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalModelFailoverReview({
      idHint: "blocked-runtime-switch-request",
      status: "blocked",
      localModelFailoverIdentity:
        "Local model failover identity: local-model-failover-review-blocked-runtime-switch-request.",
      failureCategories: [
        "Failure categories: blocked when a request asks this page to switch runtimes, retry a model call, or route fallback traffic.",
      ],
      fallbackPolicyPreview: [
        "Fallback policy preview: blocked because fallback stays manual until explicit operator approval exists.",
      ],
      retryBackoffReview: [
        "Retry/backoff review: blocked because retry calls cannot run from this page.",
      ],
      deniedFailoverShortcuts: [
        "Denied failover shortcuts: runtime switching, retry loops, prompt replay, output reuse, endpoint substitution, and credential reuse remain blocked.",
      ],
      validationEvidenceRequirements: [
        "Validation evidence requirements: blocked because live evidence cannot be generated by model calls or endpoint probes here.",
      ],
      blockedFailoverRisks: [
        "Blocked failover risks: unapproved local fallback traffic and runtime switching remain blocked.",
      ],
      integrationCandidateRoute:
        "Integration candidate route: /local-model-integration-release-candidate remains review-only.",
      outputInboxRoute:
        "Output inbox route: /local-model-output-review-inbox remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep failover blocked until output review and integration candidate checks are complete.",
      advancedFailoverDetails:
        "Advanced failover details: blocked failover cannot recover by switching runtimes, retrying model calls, routing traffic, calling local bridge endpoints, storing outputs, writing files, or mutating memory.",
    }),
  ];
}

export function buildLocalModelFailoverReviewBoundary(): LocalModelFailoverReviewBoundary {
  return {
    localModelFailoverReviewOnly: true,
    localModelFailoverReviewDoesNotSwitchRuntimes: true,
    localModelFailoverRequiresExplicitOperatorApproval: true,
    unsafeFallbackShortcutsStayBlocked: true,
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

export function summarizeLocalModelFailoverReview(
  model: Pick<LocalModelFailoverReviewModel, "reviews">
): string {
  return `Local model failover review prepares ${model.reviews.length} failover posture(s). Local model failover review does not switch runtimes, local model failover requires explicit operator approval, and unsafe fallback shortcuts stay blocked.`;
}

export function buildLocalModelFailoverReviewModel(): LocalModelFailoverReviewModel {
  const reviews = buildLocalModelFailoverReviews();
  const model: LocalModelFailoverReviewModel = {
    title: "Local model failover review",
    summary: "",
    reviews,
    boundary: buildLocalModelFailoverReviewBoundary(),
    failoverLanguage: [...LOCAL_MODEL_FAILOVER_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local model failover review",
      "local model failover identity",
      "Failure categories",
      "Fallback policy preview",
      "Retry/backoff review",
      "Denied failover shortcuts",
      "Validation evidence requirements",
      "Blocked failover risks",
      "Integration candidate route",
      "Output inbox route",
      "Next recommended action",
      "Local model failover review does not switch runtimes",
      "Local model failover requires explicit operator approval",
      "Unsafe fallback shortcuts stay blocked",
      "advanced failover details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalModelFailoverReview(model) };
}
