export type RemoteProviderCredentialBoundaryReviewStatus = "ready-for-review" | "blocked";

export type RemoteProviderCredentialBoundaryReview = {
  id: string;
  credentialBoundaryIdentity: string;
  credentialCategories: string[];
  deniedStorageLocations: string[];
  redactionRules: string[];
  manualValidationChecklist: string[];
  approvalGates: string[];
  blockedCredentialRisks: string[];
  providerFailoverRoute: string;
  multiProviderRoutingRoute: string;
  nextRecommendedAction: string;
  status: RemoteProviderCredentialBoundaryReviewStatus;
  advancedCredentialDetails: string;
};

export type RemoteProviderCredentialBoundaryReviewBoundary = {
  remoteProviderCredentialBoundaryReviewOnly: true;
  credentialBoundaryReviewDoesNotStoreCredentials: true;
  keysAndTokensAreNeverDisplayed: true;
  providerAccessRequiresExplicitOperatorApproval: true;
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
  providerKeyStorageAllowedFromUi: false;
  providerTokenStorageAllowedFromUi: false;
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

export type RemoteProviderCredentialBoundaryReviewModel = {
  title: "Remote provider credential boundary review";
  summary: string;
  reviews: RemoteProviderCredentialBoundaryReview[];
  boundary: RemoteProviderCredentialBoundaryReviewBoundary;
  credentialLanguage: string[];
  advancedDetails: string[];
};

export function buildRemoteProviderCredentialBoundaryReviewStableKey(
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
