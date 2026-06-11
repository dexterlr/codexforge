export type ProviderCostRateLimitReviewStatus = "ready-for-review" | "blocked";

export type ProviderCostRateLimitReview = {
  id: string;
  costRateLimitIdentity: string;
  budgetGroups: string[];
  tokenRequestBudgetPreview: string[];
  rateLimitPolicyPreview: string[];
  retryBackoffBoundaries: string[];
  deniedCostRateActions: string[];
  blockedCostRisks: string[];
  failoverPolicyRoute: string;
  providerSafetyRegressionRoute: string;
  nextRecommendedAction: string;
  status: ProviderCostRateLimitReviewStatus;
  advancedCostRateDetails: string;
};

export type ProviderCostRateLimitReviewBoundary = {
  providerCostRateLimitReviewOnly: true;
  costAndRateLimitReviewDoesNotCallProviders: true;
  providerSpendingRequiresExplicitOperatorApproval: true;
  rateLimitRetriesStayBlockedUntilApproved: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAICompatibleProviderApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  providerSpendingAllowedFromUi: false;
  liveBillingFetchAllowedFromUi: false;
  liveBillingCalculationAllowedFromUi: false;
  providerSwitchingAllowedFromUi: false;
  providerRetryCallsAllowedFromUi: false;
  rateLimitRetryCallsAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerResponseStorageAllowedFromUi: false;
  providerResponseIngestionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelCredentialResponseDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  credentialStorageAllowed: false;
  endpointStorageAllowed: false;
  tokenStorageAllowed: false;
  responseStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ProviderCostRateLimitReviewModel = {
  title: "Provider cost and rate-limit review";
  summary: string;
  reviews: ProviderCostRateLimitReview[];
  boundary: ProviderCostRateLimitReviewBoundary;
  costRateLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderCostRateLimitReviewStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
