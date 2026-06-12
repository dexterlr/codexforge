export type LocalModelOutputReviewInboxStatus = "ready-for-review" | "blocked";

export type LocalModelOutputReviewInbox = {
  id: string;
  localModelOutputInboxIdentity: string;
  outputReviewGroups: string[];
  outputSafetyChecks: string[];
  redactionPrivacyRules: string[];
  acceptanceRejectionCriteria: string[];
  deniedOutputActions: string[];
  blockedOutputRisks: string[];
  localFailoverRoute: string;
  runtimeBoundaryRoute: string;
  nextRecommendedAction: string;
  status: LocalModelOutputReviewInboxStatus;
  advancedOutputDetails: string;
};

export type LocalModelOutputReviewInboxBoundary = {
  localModelOutputReviewInboxReviewOnly: true;
  localModelOutputReviewDoesNotStoreModelOutputs: true;
  localModelOutputsRequireOperatorReviewBeforeUse: true;
  privatePromptDetailsStayRedacted: true;
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
  modelOutputUseBeforeReviewAllowed: false;
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

export type LocalModelOutputReviewInboxModel = {
  title: "Local model output review inbox";
  summary: string;
  inboxes: LocalModelOutputReviewInbox[];
  boundary: LocalModelOutputReviewInboxBoundary;
  outputReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelOutputReviewInboxStableKey(
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
