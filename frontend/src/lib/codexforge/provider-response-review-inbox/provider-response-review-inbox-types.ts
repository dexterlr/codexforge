export type ProviderResponseReviewInboxStatus = "ready-for-review" | "blocked";

export type ProviderResponseReviewInbox = {
  id: string;
  providerResponseInboxIdentity: string;
  responseReviewGroups: string[];
  responseSafetyChecks: string[];
  redactionPrivacyRules: string[];
  acceptanceRejectionCriteria: string[];
  deniedResponseActions: string[];
  blockedResponseRisks: string[];
  providerSafetyRegressionRoute: string;
  firstControlledTrialRoute: string;
  nextRecommendedAction: string;
  status: ProviderResponseReviewInboxStatus;
  advancedResponseDetails: string;
};

export type ProviderResponseReviewInboxBoundary = {
  providerResponseReviewInboxReviewOnly: true;
  providerResponseReviewInboxDoesNotStoreProviderResponses: true;
  providerResponsesRequireOperatorReviewBeforeUse: true;
  privatePromptDetailsStayRedacted: true;
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
  providerSwitchingAllowedFromUi: false;
  providerRetryCallsAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerResponseStorageAllowedFromUi: false;
  providerResponseIngestionAllowedFromUi: false;
  providerResponseUseBeforeReviewAllowed: false;
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

export type ProviderResponseReviewInboxModel = {
  title: "Provider response review inbox";
  summary: string;
  inboxes: ProviderResponseReviewInbox[];
  boundary: ProviderResponseReviewInboxBoundary;
  responseLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderResponseReviewInboxStableKey(
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
