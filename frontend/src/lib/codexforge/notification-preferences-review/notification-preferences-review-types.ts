export type NotificationPreferencesReviewStatus = "ready-for-review" | "blocked";

export type NotificationPreferencesReview = {
  id: string;
  notificationPreferencesIdentity: string;
  notificationGroups: string[];
  urgencyCadencePreview: string[];
  privacyRedactionRules: string[];
  deliveryApprovalGates: string[];
  blockedNotificationRisks: string[];
  approvalPolicyPresetsRoute: string;
  savedReviewViewsRoute: string;
  nextRecommendedAction: string;
  status: NotificationPreferencesReviewStatus;
  advancedNotificationDetails: string;
};

export type NotificationPreferencesReviewBoundary = {
  notificationPreferencesReviewOnly: true;
  notificationPreferencesAreNotSavedFromThisPage: true;
  noNotificationsAreSentFromThisPage: true;
  notificationDeliveryRequiresExplicitApproval: true;
  notificationPreferencePersistenceAllowedFromUi: false;
  notificationCreationAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  settingsMutationAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  personalizationPersistenceAllowedFromUi: false;
  savedViewPersistenceAllowedFromUi: false;
  approvalPolicyMutationAllowedFromUi: false;
  approvalPresetPersistenceAllowedFromUi: false;
  recoveryExecutionAllowedFromUi: false;
  recoveryPresetPersistenceAllowedFromUi: false;
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

export type NotificationPreferencesReviewModel = {
  title: "Notification preferences review";
  summary: string;
  reviews: NotificationPreferencesReview[];
  boundary: NotificationPreferencesReviewBoundary;
  notificationLanguage: string[];
  advancedDetails: string[];
};

export function buildNotificationPreferencesReviewStableKey(
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
