export type LocalProjectRunbookExportReviewStatus = "ready-for-review" | "blocked";

export type LocalProjectRunbookExportReview = {
  id: string;
  status: LocalProjectRunbookExportReviewStatus;
  runbookExportIdentity: string;
  sourceSnapshotTimelineDecisionLog: string;
  includedProjectSections: string[];
  excludedSensitiveData: string[];
  operatorChecklist: string[];
  validationHandoff: string;
  exportFormatOptions: string[];
  approvalRequirement: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedRunbookDetails: string;
};

export type LocalProjectRunbookExportReviewBoundary = {
  projectRunbookExportRequiresReview: true;
  runbookFileWrittenFromPage: false;
  sensitiveDataAndSecretsExcluded: true;
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
  runbookExportAllowedFromUi: false;
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

export type LocalProjectRunbookExportReviewModel = {
  title: "Local project runbook export review";
  summary: string;
  reviews: LocalProjectRunbookExportReview[];
  boundary: LocalProjectRunbookExportReviewBoundary;
  runbookLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalProjectRunbookExportReviewStableKey(
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
