export type LocalProjectSnapshotReviewStatus = "ready-for-review" | "blocked";

export type LocalProjectSnapshotReview = {
  id: string;
  status: LocalProjectSnapshotReviewStatus;
  snapshotReviewIdentity: string;
  projectScopeSummary: string;
  sourceProjectIntelligenceDependency: string;
  reviewedFilesModulesSummary: string;
  riskSecretsSummary: string;
  validationStatus: string;
  changeTimelineRoute: string;
  decisionLogRoute: string;
  blockedReasons: string[];
  advancedSnapshotDetails: string;
};

export type LocalProjectSnapshotReviewBoundary = {
  projectSnapshotsReviewedBeforeUse: true;
  localProjectScanRunsFromPage: false;
  secretsAndLocalPathsRedacted: true;
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

export type LocalProjectSnapshotReviewModel = {
  title: "Local project snapshot review";
  summary: string;
  reviews: LocalProjectSnapshotReview[];
  boundary: LocalProjectSnapshotReviewBoundary;
  snapshotLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalProjectSnapshotReviewStableKey(
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
