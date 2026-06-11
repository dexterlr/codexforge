export type CodingWorkflowReadinessAuditStatus = "ready-for-review" | "blocked";

export type CodingWorkflowReadinessAudit = {
  id: string;
  codingWorkflowReadinessIdentity: string;
  supportedCodingWorkflowGroups: string[];
  repoProjectBoundarySummary: string[];
  validationChecklist: string[];
  approvalApplyGates: string[];
  deniedCodingActions: string[];
  blockedCodingReadinessRisks: string[];
  creativeReadinessRoute: string;
  operatorCockpitRoute: string;
  nextRecommendedAction: string;
  status: CodingWorkflowReadinessAuditStatus;
  advancedCodingReadinessDetails: string;
};

export type CodingWorkflowReadinessAuditBoundary = {
  codingWorkflowReadinessAuditReviewOnly: true;
  codingReadinessAuditDoesNotApplyCode: true;
  codeChangesRequireExplicitOperatorApproval: true;
  validationRequiredBeforeMerge: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  codeApplyAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
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

export type CodingWorkflowReadinessAuditModel = {
  title: "Coding workflow readiness audit";
  summary: string;
  audits: CodingWorkflowReadinessAudit[];
  boundary: CodingWorkflowReadinessAuditBoundary;
  readinessLanguage: string[];
  advancedDetails: string[];
};

export function buildCodingWorkflowReadinessAuditStableKey(
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
