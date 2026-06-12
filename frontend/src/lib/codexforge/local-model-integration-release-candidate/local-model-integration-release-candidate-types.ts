export type LocalModelIntegrationReleaseCandidateStatus = "ready-for-review" | "blocked";

export type LocalModelIntegrationReleaseCandidate = {
  id: string;
  localModelIntegrationCandidateIdentity: string;
  runtimeFamilyMatrix: string[];
  routingPolicyPreview: string[];
  deniedLocalModelPaths: string[];
  credentialEndpointBoundaryStatus: string[];
  failoverStatus: string[];
  blockedIntegrationRisks: string[];
  creativeProviderTrialRoute: string;
  researchProviderTrialRoute: string;
  nextRecommendedAction: string;
  status: LocalModelIntegrationReleaseCandidateStatus;
  advancedIntegrationCandidateDetails: string;
};

export type LocalModelIntegrationReleaseCandidateBoundary = {
  localModelIntegrationReleaseCandidateReviewOnly: true;
  localModelIntegrationCandidateDoesNotRouteLiveTraffic: true;
  liveLocalModelRoutingRequiresExplicitApproval: true;
  deniedLocalModelRoutesRemainBlocked: true;
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

export type LocalModelIntegrationReleaseCandidateModel = {
  title: "Local model integration release candidate";
  summary: string;
  candidates: LocalModelIntegrationReleaseCandidate[];
  boundary: LocalModelIntegrationReleaseCandidateBoundary;
  integrationCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalModelIntegrationReleaseCandidateStableKey(
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
