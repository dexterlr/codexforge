export type LocalFirstPrivacyAuditStatus = "ready-for-review" | "blocked";

export type LocalFirstPrivacyAudit = {
  id: string;
  privacyAuditIdentity: string;
  localFirstGuaranteeSummary: string[];
  fileBoundaryAudit: string[];
  connectorBoundaryAudit: string[];
  providerBoundaryAudit: string[];
  automationBoundaryAudit: string[];
  memoryBoundaryAudit: string[];
  unresolvedPrivacyRisks: string[];
  secretsRegressionRoute: string;
  nextRecommendedRoute: string;
  status: LocalFirstPrivacyAuditStatus;
  advancedPrivacyDetails: string;
};

export type LocalFirstPrivacyAuditBoundary = {
  localFirstPrivacyAuditReviewOnly: true;
  localFirstPrivacyAuditDoesNotScanLocalFiles: true;
  privateDataIsNotSentAutomatically: true;
  unresolvedPrivacyRisksStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  localFileScanAllowedFromUi: false;
  localFileReadAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  searchExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
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

export type LocalFirstPrivacyAuditModel = {
  title: "Local-first privacy audit";
  summary: string;
  audits: LocalFirstPrivacyAudit[];
  boundary: LocalFirstPrivacyAuditBoundary;
  privacyLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalFirstPrivacyAuditStableKey(
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
