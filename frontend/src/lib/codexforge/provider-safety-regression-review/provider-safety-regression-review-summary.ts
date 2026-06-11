import type {
  ProviderSafetyRegressionReview,
  ProviderSafetyRegressionReviewBoundary,
  ProviderSafetyRegressionReviewModel,
} from "./provider-safety-regression-review-types";
import { buildProviderSafetyRegressionReviewStableKey } from "./provider-safety-regression-review-types";

export const PROVIDER_SAFETY_REGRESSION_REVIEW_LANGUAGE = [
  "Provider safety regression review",
  "Provider safety regression review does not execute provider calls",
  "Safety regressions require operator review",
  "Unresolved provider blockers stay blocked",
  "Regression groups",
  "Unsafe behavior checks",
] as const;

export function buildProviderSafetyRegressionReview(
  input: Omit<ProviderSafetyRegressionReview, "id"> & { idHint: string }
): ProviderSafetyRegressionReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderSafetyRegressionReviewStableKey("provider-safety-regression-review", idHint, input.status),
    ...review,
  };
}

export function buildProviderSafetyRegressionReviews(): ProviderSafetyRegressionReview[] {
  return [
    buildProviderSafetyRegressionReview({
      idHint: "review-only-provider-safety-regression",
      status: "ready-for-review",
      providerSafetyRegressionIdentity:
        "Provider safety regression identity: provider-safety-regression-review-review-only-provider-safety-regression.",
      regressionGroups: [
        "Regression groups: provider traffic boundary, provider connection boundary, prompt privacy boundary, response review boundary, credential boundary, cost/rate boundary, failover boundary, and memory boundary.",
        "Regression groups: groups are reviewed only; provider safety regression review does not execute provider calls.",
      ],
      unsafeBehaviorChecks: [
        "Unsafe behavior checks: no provider API calls, no live tests, no provider traffic routing, no prompt sending, no response persistence, no provider switching, no retry loops, and no local model calls.",
        "Unsafe behavior checks: safety regressions require operator review.",
      ],
      privacyCredentialChecks: [
        "Privacy and credential checks: keys, tokens, endpoints, private prompt details, provider responses, process env values, and account identifiers stay redacted or absent.",
        "Privacy and credential checks: credentials are not stored, displayed, exported, or sent.",
      ],
      approvalRegressionChecks: [
        "Approval regression checks: provider calls, spending, retries, response use, credential access, routing, failover, and memory promotion all require explicit review.",
        "Approval regression checks: approval is never granted automatically from this page.",
      ],
      deniedRegressionShortcuts: [
        "Denied regression shortcuts: run live test, call provider, send prompt, store response, ingest memory, switch provider, retry call, fetch billing, write file, apply patch, run shell command, run git command, execute workflow, or create polling loop.",
        "Denied regression shortcuts: unresolved provider blockers stay blocked.",
      ],
      unresolvedProviderSafetyBlockers: [
        "Unresolved provider safety blockers: missing approval, missing redaction, unreviewed response, cost uncertainty, retry ambiguity, failover ambiguity, credential exposure, and memory mutation risk.",
        "Unresolved provider safety blockers: blockers remain blocked until an operator reviews them outside this page.",
      ],
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate reviews routing readiness without routing live traffic.",
      costRateLimitRoute:
        "Cost/rate-limit route: /provider-cost-rate-limit-review reviews provider cost and rate-limit policy without calling providers.",
      nextRecommendedAction:
        "Next recommended action: keep unresolved provider blockers blocked, then review multi-provider routing and cost/rate-limit posture before any future approval packet.",
      advancedRegressionDetails:
        "Advanced regression details: provider safety regression review is review-only. Provider safety regression review does not execute provider calls, safety regressions require operator review, and unresolved provider blockers stay blocked. It does not run live tests, call provider APIs, call OpenAI-compatible providers, connect providers, test provider connections, route provider traffic, send prompts, store provider responses, ingest provider responses, store credentials, store tokens, store endpoints, fetch billing, calculate live billing, spend tokens, retry provider calls, switch providers, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential/response data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderSafetyRegressionReview({
      idHint: "blocked-live-regression-test-request",
      status: "blocked",
      providerSafetyRegressionIdentity:
        "Provider safety regression identity: provider-safety-regression-review-blocked-live-regression-test-request.",
      regressionGroups: [
        "Regression groups: blocked when a request asks this page to run a live provider safety test.",
      ],
      unsafeBehaviorChecks: [
        "Unsafe behavior checks: blocked because provider safety regression review does not execute provider calls.",
      ],
      privacyCredentialChecks: [
        "Privacy and credential checks: blocked because credentials and private prompt details cannot be exposed.",
      ],
      approvalRegressionChecks: [
        "Approval regression checks: blocked because safety regressions require operator review.",
      ],
      deniedRegressionShortcuts: [
        "Denied regression shortcuts: live tests, provider calls, prompt sends, response storage, retries, switching, file writes, and memory mutation remain blocked.",
      ],
      unresolvedProviderSafetyBlockers: [
        "Unresolved provider safety blockers: live regression request remains blocked until reviewed elsewhere.",
      ],
      multiProviderRoutingRoute:
        "Multi-provider routing route: /multi-provider-routing-release-candidate remains review-only.",
      costRateLimitRoute:
        "Cost/rate-limit route: /provider-cost-rate-limit-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the live regression request blocked and review cost/rate-limit policy next.",
      advancedRegressionDetails:
        "Advanced regression details: blocked safety regression cannot recover by running live tests, calling providers, storing credentials, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderSafetyRegressionReviewBoundary(): ProviderSafetyRegressionReviewBoundary {
  return {
    providerSafetyRegressionReviewOnly: true,
    providerSafetyRegressionReviewDoesNotExecuteProviderCalls: true,
    safetyRegressionsRequireOperatorReview: true,
    unresolvedProviderBlockersStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAICompatibleProviderApiCallsAllowedFromUi: false,
    providerConnectionAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    providerLiveTestsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerTrafficRoutingAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    promptSendingAllowedFromUi: false,
    providerResponseStorageAllowedFromUi: false,
    providerResponseIngestionAllowedFromUi: false,
    localModelCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderModelCredentialResponseDataAutoSendAllowed: false,
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
    responseStorageAllowed: false,
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

export function summarizeProviderSafetyRegressionReview(
  model: Pick<ProviderSafetyRegressionReviewModel, "reviews">
): string {
  return `Provider safety regression review prepares ${model.reviews.length} safety regression posture(s). Provider safety regression review does not execute provider calls, safety regressions require operator review, and unresolved provider blockers stay blocked.`;
}

export function buildProviderSafetyRegressionReviewModel(): ProviderSafetyRegressionReviewModel {
  const reviews = buildProviderSafetyRegressionReviews();
  const model: ProviderSafetyRegressionReviewModel = {
    title: "Provider safety regression review",
    summary: "",
    reviews,
    boundary: buildProviderSafetyRegressionReviewBoundary(),
    regressionLanguage: [...PROVIDER_SAFETY_REGRESSION_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider safety regression review",
      "provider safety regression identity",
      "Regression groups",
      "Unsafe behavior checks",
      "Privacy and credential checks",
      "Approval regression checks",
      "Denied regression shortcuts",
      "Unresolved provider safety blockers",
      "Multi-provider routing route",
      "Cost/rate-limit route",
      "Next recommended action",
      "Provider safety regression review does not execute provider calls",
      "Safety regressions require operator review",
      "Unresolved provider blockers stay blocked",
      "advanced regression details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderSafetyRegressionReview(model) };
}
