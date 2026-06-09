export type ConditionalWatchApprovalStatus = "needs approval" | "blocked";

export type ConditionalWatchReviewItem = {
  id: string;
  inboxIdentity: string;
  sourceReminderBoundary: string;
  sourceScheduledResearchBoundary: string;
  proposedWatchSummary: string;
  triggerConditionSummary: string;
  dataAccessBoundary: string;
  approvalStatus: ConditionalWatchApprovalStatus;
  blockedWatchReasons: string[];
  automationReleaseRoute: string;
  auditHandoff: string;
  advancedWatchDetails: string;
};

export type ConditionalWatchReviewBoundary = {
  conditionalWatchReviewOnly: true;
  conditionalWatchesReviewedBeforeActivation: true;
  noWatchActivatedFromPage: true;
  noBackgroundCheckRunsFromPage: true;
  watchCreationAllowedFromUi: false;
  watchActivationAllowedFromUi: false;
  backgroundCheckAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  backgroundWorkAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  scheduleCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
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
  promptOrFileAutoSendAllowed: false;
  promptFileSourceAutoSendAllowed: false;
  promptFileSourceConnectorAutoSendAllowed: false;
  sourceAutoSendAllowed: false;
  sourceAutoFetchAllowed: false;
  sourceAutoRefreshAllowed: false;
  freshnessAutoRecheckAllowed: false;
  evidenceAutoIngestionAllowed: false;
  evidenceAutoUpdateAllowed: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  pluginExecutionAllowedFromUi: false;
  toolExecutionAllowedFromUi: false;
  agentExecutionAllowedFromUi: false;
  extensionRuntimeExecutorCreated: false;
  mcpRuntimeCreated: false;
  mcpServerCreated: false;
  mcpClientCreated: false;
  mcpToolCallsAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  artifactDeletionAllowed: false;
  patchApplyAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ConditionalWatchReviewInboxModel = {
  title: "Conditional watch review inbox";
  summary: string;
  items: ConditionalWatchReviewItem[];
  boundary: ConditionalWatchReviewBoundary;
  inboxLanguage: string[];
  advancedDetails: string[];
};

export function buildConditionalWatchReviewInboxStableKey(
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
