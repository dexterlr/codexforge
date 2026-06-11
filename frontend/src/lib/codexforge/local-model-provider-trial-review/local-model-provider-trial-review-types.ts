export type LocalModelProviderTrialReviewStatus = "ready-for-review" | "blocked";

export type LocalModelProviderTrialReview = {
  id: string;
  localModelProviderTrialIdentity: string;
  localModelFamilies: string[];
  localBridgeDependencySummary: string[];
  deniedLocalModelActions: string[];
  manualValidationChecklist: string[];
  safetyCredentialBoundaries: string[];
  blockedLocalModelTrialRisks: string[];
  providerIntegrationRoute: string;
  betaHardeningRoute: string;
  nextRecommendedAction: string;
  status: LocalModelProviderTrialReviewStatus;
  advancedLocalModelDetails: string;
};

export type LocalModelProviderTrialReviewBoundary = {
  localModelProviderTrialReviewOnly: true;
  localModelTrialReviewDoesNotCallLocalModels: true;
  localModelTrafficRequiresExplicitOperatorApproval: true;
  localCredentialsAndEndpointsStayPrivate: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localModelTrafficAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localServiceCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  localProbeExecutionAllowedFromUi: false;
  endpointStorageAllowed: false;
  tokenStorageAllowed: false;
  localCredentialStorageAllowed: false;
  providerApiCallsAllowedFromUi: false;
  openAICompatibleProviderApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelDataAutoSendAllowed: false;
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

export type LocalModelProviderTrialReviewModel = {
  title: "Local model provider trial review";
  summary: string;
  reviews: LocalModelProviderTrialReview[];
  boundary: LocalModelProviderTrialReviewBoundary;
  localModelTrialLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelProviderTrialReviewStableKey(
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
