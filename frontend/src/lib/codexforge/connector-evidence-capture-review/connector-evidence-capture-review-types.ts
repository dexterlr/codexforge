export type ConnectorEvidenceCaptureReviewStatus = "ready for redaction" | "blocked";

export type ConnectorEvidenceCaptureReview = {
  id: string;
  evidenceCaptureIdentity: string;
  sourceConnectorWorkspace: string;
  approvedConnectorBoundaryDependency: string;
  captureSourceSummary: string;
  evidencePacketSummary: string;
  allowedEvidenceTypes: string[];
  deniedEvidenceTypes: string[];
  redactionRoute: string;
  releaseCandidateRoute: string;
  blockedReasons: string[];
  status: ConnectorEvidenceCaptureReviewStatus;
  advancedEvidenceDetails: string;
};

export type ConnectorEvidenceCaptureReviewBoundary = {
  connectorEvidenceCaptureReviewOnly: true;
  connectorEvidenceReviewedBeforeUse: true;
  connectorDataCapturedFromPageAllowed: false;
  connectorDataReadFromPageAllowed: false;
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
  privateConnectorValuesDisplayedAllowed: false;
  tokensDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  connectorSyncAllowedFromUi: false;
  automaticConnectorReadsAllowed: false;
  automaticEmailReadsAllowed: false;
  automaticCalendarReadsAllowed: false;
  automaticContactReadsAllowed: false;
  emailDraftSendAllowedFromUi: false;
  calendarEventMutationAllowedFromUi: false;
  contactMutationAllowedFromUi: false;
  connectorEvidenceMutationAllowedFromUi: false;
  connectorEvidenceAutoIngestionAllowed: false;
  connectorEvidenceAutoPromotionAllowed: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  automaticProviderCallsAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptFileSourceConnectorAutoSendAllowed: false;
  notificationSendAllowedFromUi: false;
  notificationDeliveryAllowedFromUi: false;
  reminderCreationAllowedFromUi: false;
  taskSchedulingAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
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

export type ConnectorEvidenceCaptureReviewModel = {
  title: "Connector evidence capture review";
  summary: string;
  reviews: ConnectorEvidenceCaptureReview[];
  boundary: ConnectorEvidenceCaptureReviewBoundary;
  captureLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorEvidenceCaptureReviewStableKey(
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
