export type DailyUseOnboardingPolishStatus = "ready-for-review" | "blocked";

export type DailyUseOnboardingPolish = {
  id: string;
  onboardingPolishIdentity: string;
  firstDayOperatorPath: string[];
  noviceExpertEntryPoints: string[];
  recommendedReviewSequence: string[];
  safetyCheckpointReminders: string[];
  blockedOnboardingRisks: string[];
  operatorPreferencesRoute: string;
  savedReviewViewsRoute: string;
  nextRecommendedAction: string;
  status: DailyUseOnboardingPolishStatus;
  advancedOnboardingDetails: string;
};

export type DailyUseOnboardingPolishBoundary = {
  dailyUseOnboardingPolishReviewOnly: true;
  onboardingPolishDoesNotChangeSettings: true;
  onboardingDoesNotRunWorkflowsAutomatically: true;
  approvalGatesRemainVisible: true;
  settingsMutationAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  personalizationPersistenceAllowedFromUi: false;
  savedViewPersistenceAllowedFromUi: false;
  localStorageWritesAllowedFromUi: false;
  sessionStorageWritesAllowedFromUi: false;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  approvalAutomationAllowedFromUi: false;
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

export type DailyUseOnboardingPolishModel = {
  title: "Daily use onboarding polish";
  summary: string;
  reviews: DailyUseOnboardingPolish[];
  boundary: DailyUseOnboardingPolishBoundary;
  onboardingLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyUseOnboardingPolishStableKey(
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
