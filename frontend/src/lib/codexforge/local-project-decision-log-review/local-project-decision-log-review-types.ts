export type LocalProjectDecisionLogReviewStatus = "ready-for-review" | "blocked";

export type LocalProjectDecisionLogReview = {
  id: string;
  status: LocalProjectDecisionLogReviewStatus;
  decisionLogIdentity: string;
  sourceProjectSnapshotTimeline: string;
  decisionSummary: string;
  rationaleSummary: string;
  affectedProjectAreas: string[];
  unresolvedQuestions: string[];
  memoryPromotionPolicy: string;
  runbookExportRoute: string;
  blockedReasons: string[];
  advancedDecisionDetails: string;
};

export type LocalProjectDecisionLogReviewBoundary = {
  decisionsReviewedBeforeProjectMemory: true;
  unresolvedQuestionsStayVisible: true;
  memoryPromotionRequiresExplicitReview: true;
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

export type LocalProjectDecisionLogReviewModel = {
  title: "Local project decision log review";
  summary: string;
  reviews: LocalProjectDecisionLogReview[];
  boundary: LocalProjectDecisionLogReviewBoundary;
  decisionLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalProjectDecisionLogReviewStableKey(
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
