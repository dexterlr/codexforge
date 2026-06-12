export type AutomationScheduleSafetyReviewStatus = "ready-for-review" | "blocked";

export type AutomationScheduleSafetyReview = {
  id: string;
  automationScheduleSafetyIdentity: string;
  scheduleSafetyGroups: string[];
  cadenceRateLimitChecklist: string[];
  quietHoursNotificationChecklist: string[];
  deniedScheduleShortcuts: string[];
  connectorProviderTimingBoundaryNotes: string[];
  blockedScheduleRisks: string[];
  automationReleaseCandidateRoute: string;
  dryRunRoute: string;
  nextRecommendedAction: string;
  status: AutomationScheduleSafetyReviewStatus;
  advancedScheduleDetails: string;
};

export type AutomationScheduleSafetyReviewBoundary = {
  automationScheduleSafetyReviewOnly: true;
  automationScheduleSafetyReviewDoesNotScheduleTasks: true;
  scheduledAutomationRequiresExplicitOperatorApproval: true;
  unsafeScheduleShortcutsStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  approvalAutomationAllowedFromUi: false;
  actionsApprovedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationRulePersistenceAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  conditionalWatchCreationAllowedFromUi: false;
  watchCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  connectorAccountConnectionAllowedFromUi: false;
  connectorDataFetchAllowedFromUi: false;
  connectorDataStorageAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  providerLiveConnectionTestsAllowedFromUi: false;
  providerTrafficRoutingAllowedFromUi: false;
  promptSendingAllowedFromUi: false;
  providerOutputStorageAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  localToolLaunchingAllowedFromUi: false;
  creativeAssetGenerationAllowedFromUi: false;
  researchExecutionAllowedFromUi: false;
  codingWorkflowExecutionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  webSearchApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  evidenceAutoIngestionAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  tokenStorageAllowed: false;
  endpointStorageAllowed: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
  automationDataStorageAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  routeCoverageRemovalAllowed: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type AutomationScheduleSafetyReviewModel = {
  title: "Automation schedule safety review";
  summary: string;
  reviews: AutomationScheduleSafetyReview[];
  boundary: AutomationScheduleSafetyReviewBoundary;
  scheduleLanguage: string[];
  advancedDetails: string[];
};

export function buildAutomationScheduleSafetyReviewStableKey(
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
