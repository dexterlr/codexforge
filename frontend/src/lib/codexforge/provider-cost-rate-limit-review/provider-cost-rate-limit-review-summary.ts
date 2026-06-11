import type {
  ProviderCostRateLimitReview,
  ProviderCostRateLimitReviewBoundary,
  ProviderCostRateLimitReviewModel,
} from "./provider-cost-rate-limit-review-types";
import { buildProviderCostRateLimitReviewStableKey } from "./provider-cost-rate-limit-review-types";

export const PROVIDER_COST_RATE_LIMIT_REVIEW_LANGUAGE = [
  "Provider cost and rate-limit review",
  "Cost and rate-limit review does not call providers",
  "Provider spending requires explicit operator approval",
  "Rate-limit retries stay blocked until approved",
  "Budget groups",
  "Token request budget preview",
] as const;

export function buildProviderCostRateLimitReview(
  input: Omit<ProviderCostRateLimitReview, "id"> & { idHint: string }
): ProviderCostRateLimitReview {
  const { idHint, ...review } = input;
  return {
    id: buildProviderCostRateLimitReviewStableKey("provider-cost-rate-limit-review", idHint, input.status),
    ...review,
  };
}

export function buildProviderCostRateLimitReviews(): ProviderCostRateLimitReview[] {
  return [
    buildProviderCostRateLimitReview({
      idHint: "review-only-cost-rate-policy",
      status: "ready-for-review",
      costRateLimitIdentity:
        "Cost and rate-limit identity: provider-cost-rate-limit-review-review-only-cost-rate-policy.",
      budgetGroups: [
        "Budget groups: trial budget, prompt budget, response review budget, retry budget, failover budget, and manual hold budget.",
        "Budget groups: budget labels are reviewed only; provider spending requires explicit operator approval.",
      ],
      tokenRequestBudgetPreview: [
        "Token request budget preview: request class, redacted prompt class, estimated token envelope label, response review hold, and manual approval owner.",
        "Token request budget preview: preview text does not fetch billing, call providers, or calculate live billing.",
      ],
      rateLimitPolicyPreview: [
        "Rate-limit policy preview: manual hold on quota, timeout, rate limit, provider unavailable, unsupported capability, privacy mismatch, and missing approval.",
        "Rate-limit policy preview: rate-limit retries stay blocked until approved.",
      ],
      retryBackoffBoundaries: [
        "Retry/backoff boundaries: retries are policy text only, cooldowns are advisory labels, and no retry call can run from this review.",
        "Retry/backoff boundaries: provider retry calls and provider switching remain blocked.",
      ],
      deniedCostRateActions: [
        "Denied cost/rate actions: live billing fetch, provider calls, token spending, auto-spend, retry calls, provider switching, failover routing, prompt sending, response persistence, and credential storage.",
        "Denied cost/rate actions: file mutation, memory mutation, workflow execution, shell execution, git execution, connector calls, web/search calls, GitHub calls, background jobs, and polling loops.",
      ],
      blockedCostRisks: [
        "Blocked cost risks: unapproved spend, hidden retry loop, unbounded request budget, rate-limit bypass, failover spend, credential exposure, response storage, and live billing dependency.",
        "Blocked cost risks: unresolved cost and rate risks stay blocked.",
      ],
      failoverPolicyRoute:
        "Failover policy route: /provider-failover-policy-review reviews fallback behavior without switching providers.",
      providerSafetyRegressionRoute:
        "Provider safety regression route: /provider-safety-regression-review checks provider safety assumptions without executing provider calls.",
      nextRecommendedAction:
        "Next recommended action: review safety regression assumptions before any provider spending or rate-limit retry approval packet.",
      advancedCostRateDetails:
        "Advanced cost/rate details: provider cost and rate-limit review is review-only. Cost and rate-limit review does not call providers, provider spending requires explicit operator approval, and rate-limit retries stay blocked until approved. It does not call provider APIs, call OpenAI-compatible providers, connect providers, test provider connections, route provider traffic, send prompts, store provider responses, ingest provider responses, store credentials, store tokens, store endpoints, fetch billing, calculate live billing, spend tokens, retry provider calls, switch providers, call local models, call local bridge endpoints, call connector APIs, call web/search APIs, call GitHub APIs, send prompt/file/project/connector/provider/model/credential/response data without approval, scan arbitrary projects, browse local files, crawl paths, read local files, open local files, auto-open files, run git commands, run shell commands, run tests, run builds, run smoke checks, run workflows, execute actions, approve actions, automate approval, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderCostRateLimitReview({
      idHint: "blocked-live-billing-request",
      status: "blocked",
      costRateLimitIdentity:
        "Cost and rate-limit identity: provider-cost-rate-limit-review-blocked-live-billing-request.",
      budgetGroups: [
        "Budget groups: blocked when a request asks this page to fetch billing, spend tokens, or start retries.",
      ],
      tokenRequestBudgetPreview: [
        "Token request budget preview: blocked because live billing and provider calls cannot run here.",
      ],
      rateLimitPolicyPreview: [
        "Rate-limit policy preview: blocked because rate-limit retries stay blocked until approved.",
      ],
      retryBackoffBoundaries: [
        "Retry/backoff boundaries: blocked because retry calls cannot run from this page.",
      ],
      deniedCostRateActions: [
        "Denied cost/rate actions: billing fetch, provider spend, retry calls, provider switching, and credential storage remain blocked.",
      ],
      blockedCostRisks: [
        "Blocked cost risks: unapproved spend and retry loops remain blocked.",
      ],
      failoverPolicyRoute:
        "Failover policy route: /provider-failover-policy-review remains review-only.",
      providerSafetyRegressionRoute:
        "Provider safety regression route: /provider-safety-regression-review remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep provider spending blocked until cost and safety reviews are complete.",
      advancedCostRateDetails:
        "Advanced cost/rate details: blocked cost review cannot recover by fetching billing, calling providers, retrying calls, writing files, or mutating memory.",
    }),
  ];
}

export function buildProviderCostRateLimitReviewBoundary(): ProviderCostRateLimitReviewBoundary {
  return {
    providerCostRateLimitReviewOnly: true,
    costAndRateLimitReviewDoesNotCallProviders: true,
    providerSpendingRequiresExplicitOperatorApproval: true,
    rateLimitRetriesStayBlockedUntilApproved: true,
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
    providerSpendingAllowedFromUi: false,
    liveBillingFetchAllowedFromUi: false,
    liveBillingCalculationAllowedFromUi: false,
    providerSwitchingAllowedFromUi: false,
    providerRetryCallsAllowedFromUi: false,
    rateLimitRetryCallsAllowedFromUi: false,
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

export function summarizeProviderCostRateLimitReview(
  model: Pick<ProviderCostRateLimitReviewModel, "reviews">
): string {
  return `Provider cost and rate-limit review prepares ${model.reviews.length} cost and rate-limit posture(s). Cost and rate-limit review does not call providers, provider spending requires explicit operator approval, and rate-limit retries stay blocked until approved.`;
}

export function buildProviderCostRateLimitReviewModel(): ProviderCostRateLimitReviewModel {
  const reviews = buildProviderCostRateLimitReviews();
  const model: ProviderCostRateLimitReviewModel = {
    title: "Provider cost and rate-limit review",
    summary: "",
    reviews,
    boundary: buildProviderCostRateLimitReviewBoundary(),
    costRateLanguage: [...PROVIDER_COST_RATE_LIMIT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Provider cost and rate-limit review",
      "cost and rate-limit identity",
      "Budget groups",
      "Token request budget preview",
      "Rate-limit policy preview",
      "Retry/backoff boundaries",
      "Denied cost/rate actions",
      "Blocked cost risks",
      "Failover policy route",
      "Provider safety regression route",
      "Next recommended action",
      "Cost and rate-limit review does not call providers",
      "Provider spending requires explicit operator approval",
      "Rate-limit retries stay blocked until approved",
      "advanced cost/rate details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderCostRateLimitReview(model) };
}
