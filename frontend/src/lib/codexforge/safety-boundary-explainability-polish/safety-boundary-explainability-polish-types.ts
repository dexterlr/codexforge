export type SafetyBoundaryExplainabilityPolishStatus = "ready-for-review" | "blocked";

export type SafetyBoundaryExplainabilityPolish = {
  id: string;
  explainabilityIdentity: string;
  boundaryExplanationGroups: string[];
  noviceExplanationMode: string[];
  expertExplanationMode: string[];
  blockedActionExamples: string[];
  whyApprovalIsRequired: string[];
  unresolvedExplanationGaps: string[];
  dailyOnboardingRoute: string;
  nextRecommendedAction: string;
  status: SafetyBoundaryExplainabilityPolishStatus;
  advancedExplainabilityDetails: string;
};

export type SafetyBoundaryExplainabilityPolishBoundary = {
  safetyBoundaryExplainabilityReviewOnly: true;
  safetyExplanationsDoNotWeakenBoundaries: true;
  approvalGatesRemainEnforced: true;
  blockedActionsStayBlockedUntilResolved: true;
  safetyBoundaryMutationAllowedFromUi: false;
  actionsApprovedFromUi: false;
  actionsExecutedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  approvalPolicyMutationAllowedFromUi: false;
  approvalPresetPersistenceAllowedFromUi: false;
  recoveryExecutionAllowedFromUi: false;
  recoveryPresetPersistenceAllowedFromUi: false;
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

export type SafetyBoundaryExplainabilityPolishModel = {
  title: "Safety boundary explainability polish";
  summary: string;
  explanations: SafetyBoundaryExplainabilityPolish[];
  boundary: SafetyBoundaryExplainabilityPolishBoundary;
  explainabilityLanguage: string[];
  advancedDetails: string[];
};

export function buildSafetyBoundaryExplainabilityPolishStableKey(
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
