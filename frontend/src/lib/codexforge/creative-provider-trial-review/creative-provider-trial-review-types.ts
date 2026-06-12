export type CreativeProviderTrialReviewStatus = "ready-for-review" | "blocked";

export type CreativeProviderTrialReview = {
  id: string;
  creativeProviderTrialIdentity: string;
  creativeProviderFamilies: string[];
  assetGenerationBoundaryNotes: string[];
  localBridgeDependencyNotes: string[];
  approvalGateChecklist: string[];
  deniedCreativeProviderActions: string[];
  blockedCreativeTrialRisks: string[];
  researchProviderTrialRoute: string;
  crossProviderComparisonRoute: string;
  nextRecommendedAction: string;
  status: CreativeProviderTrialReviewStatus;
  advancedCreativeProviderDetails: string;
};

export type CreativeProviderTrialReviewBoundary = {
  creativeProviderTrialReviewOnly: true;
  creativeProviderTrialDoesNotGenerateAssets: true;
  creativeProviderCallsRequireExplicitOperatorApproval: true;
  generatedAssetsAreReviewedBeforeUse: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  creativeWorkflowExecutionAllowedFromUi: false;
  assetGenerationAllowedFromUi: false;
  mediaGenerationAllowedFromUi: false;
  imageGenerationAllowedFromUi: false;
  videoGenerationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  creativeProviderCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerOutputIngestionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelOutputDataAutoSendAllowed: false;
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
  evidenceIngestionAllowedFromUi: false;
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
  outputStorageAllowed: false;
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

export type CreativeProviderTrialReviewModel = {
  title: "Creative provider trial review";
  summary: string;
  trials: CreativeProviderTrialReview[];
  boundary: CreativeProviderTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildCreativeProviderTrialReviewStableKey(
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
