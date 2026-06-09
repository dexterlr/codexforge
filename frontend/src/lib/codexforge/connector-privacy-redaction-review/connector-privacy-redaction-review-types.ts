export type ConnectorPrivacyRedactionReviewStatus = "ready for handoff" | "blocked";

export type ConnectorPrivacyRedactionReview = {
  id: string;
  redactionReviewIdentity: string;
  sourceConnectorEvidenceCapture: string;
  detectedPrivateFields: string[];
  redactionPolicy: string[];
  minimizationPolicy: string[];
  allowedEvidenceFields: string[];
  excludedEvidenceFields: string[];
  reviewHandoffRoute: string;
  blockedReasons: string[];
  status: ConnectorPrivacyRedactionReviewStatus;
  advancedRedactionDetails: string;
};

export type ConnectorPrivacyRedactionReviewBoundary = {
  connectorPrivacyRedactionReviewOnly: true;
  redactionBeforeConnectorEvidenceLeavesReview: true;
  privateConnectorValuesDisplayedAllowed: false;
  secretsAndTokensIncludedAllowed: false;
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
  connectorDataReadFromPageAllowed: false;
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

export type ConnectorPrivacyRedactionReviewModel = {
  title: "Connector privacy redaction review";
  summary: string;
  reviews: ConnectorPrivacyRedactionReview[];
  boundary: ConnectorPrivacyRedactionReviewBoundary;
  redactionLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorPrivacyRedactionReviewStableKey(
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
