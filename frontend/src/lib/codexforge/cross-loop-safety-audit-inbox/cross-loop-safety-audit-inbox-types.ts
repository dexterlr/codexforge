export type CrossLoopSafetyAuditStatus = "ready-for-review" | "blocked";

export type CrossLoopSafetyAuditInboxItem = {
  id: string;
  auditInboxIdentity: string;
  sourceHandoffReview: string;
  auditedLoopBoundaries: string[];
  approvalGateChecks: string[];
  privacyRedactionChecks: string[];
  executionBoundaryChecks: string[];
  memoryBoundaryChecks: string[];
  unresolvedAuditItems: string[];
  dashboardRoute: string;
  blockedReasons: string[];
  status: CrossLoopSafetyAuditStatus;
  advancedAuditDetails: string;
};

export type CrossLoopSafetyAuditInboxBoundary = {
  safetyAuditItemsReviewedBeforeRelease: true;
  unresolvedAuditItemsStayBlocked: true;
  noActionExecutedFromPage: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
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

export type CrossLoopSafetyAuditInboxModel = {
  title: "Cross-loop safety audit inbox";
  summary: string;
  auditItems: CrossLoopSafetyAuditInboxItem[];
  boundary: CrossLoopSafetyAuditInboxBoundary;
  auditLanguage: string[];
  advancedDetails: string[];
};

export function buildCrossLoopSafetyAuditInboxStableKey(
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
