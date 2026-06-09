export type TaskReminderBoundaryReviewStatus = "approval required" | "blocked";

export type TaskReminderBoundaryReview = {
  id: string;
  boundaryIdentity: string;
  sourceNotificationCenter: string;
  reminderRequestSummary: string;
  allowedReminderScope: string;
  deniedReminderScope: string;
  privacyRedactionPolicy: string[];
  deliveryChannelPolicy: string[];
  approvalRequirement: string;
  conditionalWatchRoute: string;
  blockedReasons: string[];
  status: TaskReminderBoundaryReviewStatus;
  advancedReminderDetails: string;
};

export type TaskReminderBoundaryReviewBoundary = {
  taskReminderBoundaryReviewOnly: true;
  taskRemindersRequireExplicitApproval: true;
  noReminderCreatedFromPage: true;
  notificationDeliveryNotEnabledHere: true;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  backgroundWorkAllowedFromUi: false;
  notificationSendAllowedFromUi: false;
  notificationDeliveryAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorTokenStorageAllowedFromUi: false;
  browserTokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  tokensDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  privateConnectorValuesDisplayedAllowed: false;
  connectorDataReadFromPageAllowed: false;
  connectorSyncAllowedFromUi: false;
  automaticConnectorReadsAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
  emailDraftSendAllowedFromUi: false;
  calendarEventMutationAllowedFromUi: false;
  contactMutationAllowedFromUi: false;
  automaticWebBrowsingAllowed: false;
  webBrowsingAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  automaticProviderCallsAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptFileSourceConnectorAutoSendAllowed: false;
  sourceAutoFetchAllowed: false;
  sourceAutoRefreshAllowed: false;
  freshnessAutoRecheckAllowed: false;
  evidenceAutoUpdateAllowed: false;
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
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type TaskReminderBoundaryReviewModel = {
  title: "Task reminder boundary review";
  summary: string;
  reviews: TaskReminderBoundaryReview[];
  boundary: TaskReminderBoundaryReviewBoundary;
  reminderLanguage: string[];
  advancedDetails: string[];
};

export function buildTaskReminderBoundaryReviewStableKey(
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
