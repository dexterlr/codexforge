export type ConnectorReleaseDecision = "ready" | "ready with fixes" | "blocked";

export type ConnectorReleaseCandidate = {
  id: string;
  releaseCandidateIdentity: string;
  coveredConnectorSurfaces: string[];
  gmailBoundaryReadiness: string;
  calendarBoundaryReadiness: string;
  contactsBoundaryReadiness: string;
  evidenceCaptureReadiness: string;
  privacyRedactionReadiness: string;
  knownGaps: string[];
  releaseDecision: ConnectorReleaseDecision;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  advancedReleaseDetails: string;
};

export type ConnectorReleaseCandidateBoundary = {
  connectorReleaseCandidateReviewOnly: true;
  connectorsRemainApprovalGated: true;
  connectorApiRequestSentFromPageAllowed: false;
  oauthRequestFlowAllowedFromUi: false;
  connectorAuthorizationAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  gmailApiCallsAllowedFromUi: false;
  calendarApiCallsAllowedFromUi: false;
  contactsApiCallsAllowedFromUi: false;
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

export type ConnectorReleaseCandidateModel = {
  title: "Connector release candidate";
  summary: string;
  candidates: ConnectorReleaseCandidate[];
  boundary: ConnectorReleaseCandidateBoundary;
  releaseLanguage: string[];
  advancedDetails: string[];
};

export function buildConnectorReleaseCandidateStableKey(
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
