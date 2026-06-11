export type OpenAICompatibleProviderTrialReviewStatus = "ready-for-review" | "blocked";

export type OpenAICompatibleProviderTrialReview = {
  id: string;
  openAICompatibleProviderTrialIdentity: string;
  providerLaneGroups: string[];
  modelCapabilityPreview: string[];
  endpointCompatibilityNotes: string[];
  approvalGateChecklist: string[];
  deniedProviderActions: string[];
  blockedTrialRisks: string[];
  credentialBoundaryRoute: string;
  failoverPolicyRoute: string;
  nextRecommendedAction: string;
  status: OpenAICompatibleProviderTrialReviewStatus;
  advancedProviderTrialDetails: string;
};

export type OpenAICompatibleProviderTrialReviewBoundary = {
  openAICompatibleProviderTrialReviewOnly: true;
  openAICompatibleProviderTrialDoesNotSendProviderTraffic: true;
  providerTrialRequiresExplicitOperatorApproval: true;
  credentialsAndEndpointsStayPrivate: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  openAICompatibleProviderApiCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerSwitchingAllowedFromUi: false;
  providerRetryCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelCredentialDataAutoSendAllowed: false;
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

export type OpenAICompatibleProviderTrialReviewModel = {
  title: "OpenAI-compatible provider trial review";
  summary: string;
  reviews: OpenAICompatibleProviderTrialReview[];
  boundary: OpenAICompatibleProviderTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildOpenAICompatibleProviderTrialReviewStableKey(
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
