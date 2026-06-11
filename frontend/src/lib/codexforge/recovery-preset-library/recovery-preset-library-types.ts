export type RecoveryPresetLibraryStatus = "ready-for-review" | "blocked";

export type RecoveryPresetLibrary = {
  id: string;
  recoveryPresetIdentity: string;
  presetGroups: string[];
  failureCategoryMapping: string[];
  manualRecoveryChecklist: string[];
  validationEvidenceRequirements: string[];
  blockedRecoveryPresets: string[];
  safetyExplainabilityRoute: string;
  approvalPolicyRoute: string;
  nextRecommendedAction: string;
  status: RecoveryPresetLibraryStatus;
  advancedRecoveryPresetDetails: string;
};

export type RecoveryPresetLibraryBoundary = {
  recoveryPresetLibraryReviewOnly: true;
  recoveryPresetsDoNotRunRecoverySteps: true;
  recoveryPresetsRequireOperatorApprovalBeforeUse: true;
  validationEvidenceIsRequiredBeforeRetry: true;
  recoveryExecutionAllowedFromUi: false;
  recoveryPresetPersistenceAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  approvalPolicyMutationAllowedFromUi: false;
  approvalPresetPersistenceAllowedFromUi: false;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  notificationPreferencePersistenceAllowedFromUi: false;
  notificationCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  settingsMutationAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  localStorageWritesAllowedFromUi: false;
  sessionStorageWritesAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorPreferenceDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
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

export type RecoveryPresetLibraryModel = {
  title: "Recovery preset library";
  summary: string;
  presets: RecoveryPresetLibrary[];
  boundary: RecoveryPresetLibraryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildRecoveryPresetLibraryStableKey(
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
