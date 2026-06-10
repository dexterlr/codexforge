export type AutomationLoopRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type AutomationLoopRealWorldTrialReview = {
  id: string;
  automationTrialIdentity: string;
  sourceAutomationReleaseCandidate: string;
  operatorAutomationScenario: string;
  reminderWatchSchedulePlan: string[];
  approvalGates: string[];
  deliveryPrivacyPolicy: string;
  blockedRealActions: string[];
  manualValidationChecklist: string[];
  trialOutcomeNotes: string[];
  trialReportRoute: string;
  status: AutomationLoopRealWorldTrialReviewStatus;
  advancedAutomationTrialDetails: string;
};

export type AutomationLoopRealWorldTrialReviewBoundary = {
  automationTrialReviewOnly: true;
  automationTrialReviewDoesNotCreateAutomations: true;
  noBackgroundWorkRunsFromPage: true;
  notificationDeliveryRequiresExplicitApproval: true;
  realEvidenceReviewedBeforeUse: true;
  memoryPromotionBlockedUntilApproved: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  codingTaskExecutionAllowedFromUi: false;
  taskExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  automaticWebBrowsingAllowed: false;
  webBrowsingAllowedFromUi: false;
  sourceAutoFetchAllowed: false;
  sourceAutoRefreshAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorDataReadFromPageAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  reminderCreationAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  watchCreationAllowedFromUi: false;
  watchActivationAllowedFromUi: false;
  backgroundCheckAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  backgroundWorkAllowedFromUi: false;
  notificationSendingAllowedFromUi: false;
  notificationDeliveryAllowedFromUi: false;
  pollingLoopAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
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
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpToolCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type AutomationLoopRealWorldTrialReviewModel = {
  title: "Automation loop real-world trial review";
  summary: string;
  reviews: AutomationLoopRealWorldTrialReview[];
  boundary: AutomationLoopRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildAutomationLoopRealWorldTrialReviewStableKey(
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
