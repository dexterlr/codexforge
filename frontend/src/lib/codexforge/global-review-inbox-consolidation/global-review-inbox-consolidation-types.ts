export type GlobalReviewInboxConsolidationStatus = "ready-for-review" | "blocked";

export type GlobalReviewInboxConsolidation = {
  id: string;
  globalInboxIdentity: string;
  reviewItemGroups: string[];
  sourceLoopSummary: string[];
  riskSeveritySummary: string[];
  privacyRedactionStatus: string[];
  approvalQueueRoute: string;
  resultHistoryRoute: string;
  unresolvedBlockers: string[];
  nextRecommendedAction: string;
  status: GlobalReviewInboxConsolidationStatus;
  advancedInboxDetails: string;
};

export type GlobalReviewInboxConsolidationBoundary = {
  globalReviewInboxReviewOnly: true;
  globalInboxConsolidatesReviewsWithoutApprovingThem: true;
  reviewItemsRequireExplicitOperatorAction: true;
  noReviewItemExecutedFromThisPage: true;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
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
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type GlobalReviewInboxConsolidationModel = {
  title: "Global review inbox consolidation";
  summary: string;
  inboxes: GlobalReviewInboxConsolidation[];
  boundary: GlobalReviewInboxConsolidationBoundary;
  inboxLanguage: string[];
  advancedDetails: string[];
};

export function buildGlobalReviewInboxConsolidationStableKey(
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
