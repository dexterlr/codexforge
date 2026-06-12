export type ResearchProviderTrialReviewStatus = "ready-for-review" | "blocked";

export type ResearchProviderTrialReview = {
  id: string;
  researchProviderTrialIdentity: string;
  researchProviderFamilies: string[];
  evidenceCitationBoundaryNotes: string[];
  freshnessConflictChecklist: string[];
  approvalGateChecklist: string[];
  deniedResearchProviderActions: string[];
  blockedResearchTrialRisks: string[];
  codingProviderTrialRoute: string;
  crossProviderComparisonRoute: string;
  nextRecommendedAction: string;
  status: ResearchProviderTrialReviewStatus;
  advancedResearchProviderDetails: string;
};

export type ResearchProviderTrialReviewBoundary = {
  researchProviderTrialReviewOnly: true;
  researchProviderTrialDoesNotRunResearch: true;
  researchProviderCallsRequireExplicitOperatorApproval: true;
  evidenceIsNotIngestedAutomatically: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  browsingAllowedFromUi: false;
  searchAllowedFromUi: false;
  sourceFetchAllowedFromUi: false;
  externalDataFetchingAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  evidenceAutoIngestionAllowed: false;
  providerApiCallsAllowedFromUi: false;
  researchProviderCallsAllowedFromUi: false;
  providerConnectionAllowedFromUi: false;
  providerConnectionTestsAllowedFromUi: false;
  liveProviderTrafficAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  providerOutputIngestionAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderModelEvidenceOutputDataAutoSendAllowed: false;
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

export type ResearchProviderTrialReviewModel = {
  title: "Research provider trial review";
  summary: string;
  trials: ResearchProviderTrialReview[];
  boundary: ResearchProviderTrialReviewBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildResearchProviderTrialReviewStableKey(
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
