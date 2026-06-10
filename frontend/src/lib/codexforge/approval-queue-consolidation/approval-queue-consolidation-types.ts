export type ApprovalQueueConsolidationStatus = "ready-for-review" | "blocked";

export type ApprovalQueueConsolidation = {
  id: string;
  approvalQueueIdentity: string;
  pendingApprovalGroups: string[];
  approvalTypes: string[];
  safetyGateSummary: string[];
  deniedBlockedApprovals: string[];
  requiredValidationEvidence: string[];
  resultHistoryRoute: string;
  dailyHomeRoute: string;
  nextRecommendedAction: string;
  status: ApprovalQueueConsolidationStatus;
  advancedApprovalDetails: string;
};

export type ApprovalQueueConsolidationBoundary = {
  approvalQueueReviewOnly: true;
  approvalQueueRequiresExplicitOperatorApproval: true;
  noApprovalGrantedFromThisPage: true;
  blockedApprovalsStayBlockedUntilResolved: true;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  automaticApprovalAllowedFromUi: false;
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

export type ApprovalQueueConsolidationModel = {
  title: "Approval queue consolidation";
  summary: string;
  approvals: ApprovalQueueConsolidation[];
  boundary: ApprovalQueueConsolidationBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildApprovalQueueConsolidationStableKey(
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
