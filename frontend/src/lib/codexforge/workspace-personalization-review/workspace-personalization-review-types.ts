export type WorkspacePersonalizationReviewStatus = "ready-for-review" | "blocked";

export type WorkspacePersonalizationReview = {
  id: string;
  personalizationReviewIdentity: string;
  layoutGroups: string[];
  routeGroupingPreview: string[];
  noviceExpertLayoutPreview: string[];
  protectedSafetyAreas: string[];
  blockedPersonalizationRisks: string[];
  savedReviewViewsRoute: string;
  dailyOnboardingRoute: string;
  nextRecommendedAction: string;
  status: WorkspacePersonalizationReviewStatus;
  advancedPersonalizationDetails: string;
};

export type WorkspacePersonalizationReviewBoundary = {
  workspacePersonalizationReviewOnly: true;
  personalizationReviewDoesNotPersistLayoutChanges: true;
  safetyAreasCannotBeHidden: true;
  routeCoverageRemainsProtected: true;
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

export type WorkspacePersonalizationReviewModel = {
  title: "Workspace personalization review";
  summary: string;
  reviews: WorkspacePersonalizationReview[];
  boundary: WorkspacePersonalizationReviewBoundary;
  personalizationLanguage: string[];
  advancedDetails: string[];
};

export function buildWorkspacePersonalizationReviewStableKey(
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
