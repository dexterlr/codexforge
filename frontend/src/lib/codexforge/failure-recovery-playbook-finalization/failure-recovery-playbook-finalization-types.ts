export type FailureRecoveryPlaybookFinalizationStatus = "ready-for-review" | "blocked";

export type FailureRecoveryPlaybookFinalization = {
  id: string;
  recoveryPlaybookIdentity: string;
  sourceSafetyMatrix: string;
  commonFailureCategories: string[];
  recommendedManualRecoverySteps: string[];
  validationEvidenceRequired: string[];
  rollbackGuidance: string[];
  escalationGuidance: string[];
  noviceModeRoute: string;
  expertFastPathRoute: string;
  blockedReasons: string[];
  status: FailureRecoveryPlaybookFinalizationStatus;
  advancedRecoveryDetails: string;
};

export type FailureRecoveryPlaybookFinalizationBoundary = {
  recoveryPlaybookReviewOnly: true;
  recoveryPlaybookDoesNotRunRecoveryAutomatically: true;
  recoveryStepsRequireOperatorApproval: true;
  validationEvidenceReviewedBeforeRetry: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  recoveryAutomationAllowedFromUi: false;
  rollbackExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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

export type FailureRecoveryPlaybookFinalizationModel = {
  title: "Failure recovery playbook finalization";
  summary: string;
  playbooks: FailureRecoveryPlaybookFinalization[];
  boundary: FailureRecoveryPlaybookFinalizationBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildFailureRecoveryPlaybookFinalizationStableKey(
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
