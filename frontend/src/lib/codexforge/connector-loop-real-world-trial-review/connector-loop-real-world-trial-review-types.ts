export type ConnectorLoopRealWorldTrialReviewStatus = "ready-for-review" | "blocked";

export type ConnectorLoopRealWorldTrialReview = {
  id: string;
  connectorTrialIdentity: string;
  sourceConnectorReleaseCandidate: string;
  operatorConnectorScenario: string;
  connectorAccessPlan: string[];
  gmailCalendarContactsBoundaries: string[];
  privacyRedactionChecklist: string[];
  evidenceCaptureReview: string;
  blockedRealActions: string[];
  trialOutcomeNotes: string[];
  nextLoopRoute: string;
  status: ConnectorLoopRealWorldTrialReviewStatus;
  advancedConnectorTrialDetails: string;
};

export type ConnectorLoopRealWorldTrialReviewBoundary = {
  connectorTrialReviewOnly: true;
  connectorTrialReviewDoesNotReadConnectorData: true;
  gmailCalendarContactsAccessRequireExplicitApproval: true;
  tokensAndPrivateValuesNeverDisplayed: true;
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
  connectorSyncAllowedFromUi: false;
  automaticConnectorReadsAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
  emailDraftSendAllowedFromUi: false;
  calendarEventMutationAllowedFromUi: false;
  contactMutationAllowedFromUi: false;
  tokenStorageAllowed: false;
  connectorTokenStorageAllowedFromUi: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  tokensDisplayedAllowed: false;
  privateConnectorValuesDisplayedAllowed: false;
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
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ConnectorLoopRealWorldTrialReviewModel = {
  title: "Connector loop real-world trial review";
  summary: string;
  reviews: ConnectorLoopRealWorldTrialReview[];
  boundary: ConnectorLoopRealWorldTrialReviewBoundary;
  trialReviewLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorLoopRealWorldTrialReviewStableKey(
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
