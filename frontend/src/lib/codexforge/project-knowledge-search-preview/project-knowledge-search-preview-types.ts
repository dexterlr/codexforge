export type ProjectKnowledgeSearchPreviewStatus = "ready-for-review" | "blocked";

export type ProjectKnowledgeSearchPreview = {
  id: string;
  projectKnowledgeSearchIdentity: string;
  searchableKnowledgeGroups: string[];
  deniedSearchScopes: string[];
  redactionPrivacySummary: string[];
  rankingPreview: string[];
  blockedSearchRisks: string[];
  unifiedSearchCandidateRoute: string;
  privacyAuditRoute: string;
  nextRecommendedAction: string;
  status: ProjectKnowledgeSearchPreviewStatus;
  advancedSearchDetails: string;
};

export type ProjectKnowledgeSearchPreviewBoundary = {
  projectKnowledgeSearchPreviewReviewOnly: true;
  projectKnowledgeSearchPreviewDoesNotScanFiles: true;
  searchResultsAreSimulatedForReview: true;
  privateProjectDetailsStayRedacted: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  liveSearchExecutionAllowedFromUi: false;
  searchExecutionAllowedFromUi: false;
  searchQueryPersistenceAllowedFromUi: false;
  projectFileScanAllowedFromUi: false;
  projectFilesReadFromPage: false;
  localFileReadAllowedFromUi: false;
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

export type ProjectKnowledgeSearchPreviewModel = {
  title: "Project knowledge search preview";
  summary: string;
  previews: ProjectKnowledgeSearchPreview[];
  boundary: ProjectKnowledgeSearchPreviewBoundary;
  searchLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectKnowledgeSearchPreviewStableKey(
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
