export type ResultComparisonReviewStatus = "ready-for-review" | "blocked";

export type ResultComparisonReview = {
  id: string;
  resultComparisonIdentity: string;
  comparedResultGroups: string[];
  qualitySafetyComparison: string[];
  validationEvidenceComparison: string[];
  regressionNotes: string[];
  blockedComparisons: string[];
  evidenceTimelineRoute: string;
  unifiedSearchCandidateRoute: string;
  nextRecommendedAction: string;
  status: ResultComparisonReviewStatus;
  advancedComparisonDetails: string;
};

export type ResultComparisonReviewBoundary = {
  resultComparisonReviewOnly: true;
  resultComparisonDoesNotRerunWorkflows: true;
  comparisonsAreReviewedBeforeUse: true;
  historicalResultsRemainReadOnly: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowRerunAllowedFromUi: false;
  resultReplayAllowedFromUi: false;
  liveSearchExecutionAllowedFromUi: false;
  searchQueryPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorSearchEvidenceDataAutoSendAllowed: false;
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

export type ResultComparisonReviewModel = {
  title: "Result comparison review";
  summary: string;
  comparisons: ResultComparisonReview[];
  boundary: ResultComparisonReviewBoundary;
  comparisonLanguage: string[];
  advancedDetails: string[];
};

export function buildResultComparisonReviewStableKey(
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
