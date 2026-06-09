export type LocalProjectChangeTimelineReviewStatus = "ready-for-review" | "blocked";

export type LocalProjectChangeTimelineReview = {
  id: string;
  status: LocalProjectChangeTimelineReviewStatus;
  timelineReviewIdentity: string;
  sourceProjectSnapshot: string;
  changeWindowSummary: string;
  reviewedChangeEvents: string[];
  validationFailureMarkers: string[];
  regressionRiskFlags: string[];
  decisionLogRoute: string;
  runbookExportRoute: string;
  blockedReasons: string[];
  advancedTimelineDetails: string;
};

export type LocalProjectChangeTimelineReviewBoundary = {
  changeTimelinesReviewedBeforeUse: true;
  gitHistoryReadFromPage: false;
  localGitMetadataReadAllowedFromUi: false;
  timelineAutoPromotionAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  runbookFileWriteAllowedFromUi: false;
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
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type LocalProjectChangeTimelineReviewModel = {
  title: "Local project change timeline review";
  summary: string;
  reviews: LocalProjectChangeTimelineReview[];
  boundary: LocalProjectChangeTimelineReviewBoundary;
  timelineLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalProjectChangeTimelineReviewStableKey(
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
