export type LocalModelFailoverReviewStatus = "ready-for-review" | "blocked";

export type LocalModelFailoverReview = {
  id: string;
  localModelFailoverIdentity: string;
  failureCategories: string[];
  fallbackPolicyPreview: string[];
  retryBackoffReview: string[];
  deniedFailoverShortcuts: string[];
  validationEvidenceRequirements: string[];
  blockedFailoverRisks: string[];
  integrationCandidateRoute: string;
  outputInboxRoute: string;
  nextRecommendedAction: string;
  status: LocalModelFailoverReviewStatus;
  advancedFailoverDetails: string;
};

export type LocalModelFailoverReviewBoundary = {
  localModelFailoverReviewOnly: true;
  localModelFailoverReviewDoesNotSwitchRuntimes: true;
  localModelFailoverRequiresExplicitOperatorApproval: true;
  unsafeFallbackShortcutsStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localModelTrafficAllowedFromUi: false;
  localModelTrafficRoutingAllowedFromUi: false;
  localModelLiveConnectionTestsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localEndpointProbeExecutionAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  runtimeSwitchingAllowedFromUi: false;
  modelRetryCallsAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  modelOutputStorageAllowedFromUi: false;
  modelOutputIngestionAllowedFromUi: false;
  endpointStorageAllowed: false;
  credentialStorageAllowed: false;
  tokenStorageAllowed: false;
  providerApiCallsAllowedFromUi: false;
  openAICompatibleProviderApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelEndpointOutputDataAutoSendAllowed: false;
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

export type LocalModelFailoverReviewModel = {
  title: "Local model failover review";
  summary: string;
  reviews: LocalModelFailoverReview[];
  boundary: LocalModelFailoverReviewBoundary;
  failoverLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelFailoverReviewStableKey(
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
