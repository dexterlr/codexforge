export type ScheduledResearchCheckBoundaryStatus = "approval required" | "blocked";

export type ScheduledResearchCheckBoundaryReview = {
  id: string;
  boundaryIdentity: string;
  sourceResearchFreshnessBoundary: string;
  researchCheckSummary: string;
  allowedScheduleScope: string;
  deniedScheduleScope: string;
  sourceProviderBoundary: string;
  budgetRateLimitPolicy: string;
  approvalRequirement: string;
  conditionalWatchRoute: string;
  blockedReasons: string[];
  status: ScheduledResearchCheckBoundaryStatus;
  advancedScheduleDetails: string;
};

export type ScheduledResearchCheckBoundary = {
  scheduledResearchCheckBoundaryReviewOnly: true;
  scheduledResearchChecksRequireExplicitApproval: true;
  noResearchCheckScheduledFromPage: true;
  noSourceRefreshedAutomatically: true;
  scheduleCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  backgroundJobCreationAllowedFromUi: false;
  backgroundWorkAllowedFromUi: false;
  notificationSendAllowedFromUi: false;
  notificationDeliveryAllowedFromUi: false;
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
  sourceRefreshAllowedFromUi: false;
  sourceAutoIngestionAllowed: false;
  evidenceAutoIngestionAllowed: false;
  evidenceAutoUpdateAllowed: false;
  freshnessAutoRecheckAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  providerRetryAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
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
  extensionInstallAllowedFromUi: false;
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

export type ScheduledResearchCheckBoundaryModel = {
  title: "Scheduled research check boundary";
  summary: string;
  reviews: ScheduledResearchCheckBoundaryReview[];
  boundary: ScheduledResearchCheckBoundary;
  scheduleLanguage: string[];
  advancedDetails: string[];
};

export function buildScheduledResearchCheckBoundaryStableKey(
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
