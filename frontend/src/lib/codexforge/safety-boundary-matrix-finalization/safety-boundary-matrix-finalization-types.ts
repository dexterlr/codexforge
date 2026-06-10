export type SafetyBoundaryMatrixFinalizationStatus = "ready-for-review" | "blocked";

export type SafetyBoundaryMatrixFinalization = {
  id: string;
  matrixIdentity: string;
  coveredBoundaryGroups: string[];
  executionBoundaries: string[];
  providerBoundaries: string[];
  connectorBoundaries: string[];
  localFileBoundaries: string[];
  automationBoundaries: string[];
  memoryBoundaries: string[];
  unresolvedGaps: string[];
  recoveryPlaybookRoute: string;
  noviceModeRoute: string;
  expertModeRoute: string;
  status: SafetyBoundaryMatrixFinalizationStatus;
  advancedMatrixDetails: string;
};

export type SafetyBoundaryMatrixFinalizationBoundary = {
  safetyMatrixReviewOnly: true;
  safetyMatrixDoesNotExecuteAnything: true;
  unresolvedSafetyGapsStayBlocked: true;
  approvalGatesRemainRequired: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  recoveryAutomationAllowedFromUi: false;
  rollbackExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchAllowedFromUi: false;
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

export type SafetyBoundaryMatrixFinalizationModel = {
  title: "Safety boundary matrix finalization";
  summary: string;
  matrices: SafetyBoundaryMatrixFinalization[];
  boundary: SafetyBoundaryMatrixFinalizationBoundary;
  matrixLanguage: string[];
  advancedDetails: string[];
};

export function buildSafetyBoundaryMatrixFinalizationStableKey(
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
