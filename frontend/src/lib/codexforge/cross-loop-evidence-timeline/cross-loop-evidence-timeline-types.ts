export type CrossLoopEvidenceTimelineStatus = "ready-for-review" | "blocked";

export type CrossLoopEvidenceTimeline = {
  id: string;
  evidenceTimelineIdentity: string;
  evidenceGroupsByLoop: string[];
  chronologyPreview: string[];
  trustFreshnessNotes: string[];
  redactionPrivacyNotes: string[];
  blockedEvidenceGaps: string[];
  projectKnowledgeSearchRoute: string;
  resultComparisonRoute: string;
  nextRecommendedAction: string;
  status: CrossLoopEvidenceTimelineStatus;
  advancedTimelineDetails: string;
};

export type CrossLoopEvidenceTimelineBoundary = {
  crossLoopEvidenceTimelineReviewOnly: true;
  evidenceTimelineDoesNotFetchExternalData: true;
  evidenceIsReviewedBeforeIngestion: true;
  privateEvidenceStaysRedactedUntilApproved: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  externalDataFetchingAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
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

export type CrossLoopEvidenceTimelineModel = {
  title: "Cross-loop evidence timeline";
  summary: string;
  timelines: CrossLoopEvidenceTimeline[];
  boundary: CrossLoopEvidenceTimelineBoundary;
  timelineLanguage: string[];
  advancedDetails: string[];
};

export function buildCrossLoopEvidenceTimelineStableKey(
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
