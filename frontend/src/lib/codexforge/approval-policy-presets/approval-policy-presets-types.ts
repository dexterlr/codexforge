export type ApprovalPolicyPresetsStatus = "ready-for-review" | "blocked";

export type ApprovalPolicyPresets = {
  id: string;
  approvalPolicyPresetIdentity: string;
  presetGroups: string[];
  noviceExpertPresetPreview: string[];
  requiredApprovalGates: string[];
  deniedAutomationPolicy: string[];
  blockedPresetRisks: string[];
  recoveryPresetLibraryRoute: string;
  safetyExplainabilityRoute: string;
  nextRecommendedAction: string;
  status: ApprovalPolicyPresetsStatus;
  advancedPolicyDetails: string;
};

export type ApprovalPolicyPresetsBoundary = {
  approvalPolicyPresetsReviewOnly: true;
  approvalPresetsDoNotChangeLivePolicy: true;
  policyChangesRequireExplicitOperatorApproval: true;
  unsafeApprovalShortcutsStayBlocked: true;
  approvalPolicyMutationAllowedFromUi: false;
  approvalPresetPersistenceAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  settingsMutationAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  notificationPreferencePersistenceAllowedFromUi: false;
  notificationCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  recoveryExecutionAllowedFromUi: false;
  recoveryPresetPersistenceAllowedFromUi: false;
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

export type ApprovalPolicyPresetsModel = {
  title: "Approval policy presets";
  summary: string;
  presets: ApprovalPolicyPresets[];
  boundary: ApprovalPolicyPresetsBoundary;
  policyLanguage: string[];
  advancedDetails: string[];
};

export function buildApprovalPolicyPresetsStableKey(
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
