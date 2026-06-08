export type CalendarConnectorBoundaryReviewStatus = "review required" | "blocked";

export type CalendarConnectorBoundaryReview = {
  id: string;
  boundaryIdentity: string;
  sourceConnectorWorkspace: string;
  requestedCalendarScopeSummary: string;
  allowedCalendarActions: string[];
  deniedCalendarActions: string[];
  attendeePrivacyPolicy: string[];
  eventMutationApprovalRequirement: string;
  evidenceCaptureRoute: string;
  blockedReasons: string[];
  status: CalendarConnectorBoundaryReviewStatus;
  advancedCalendarDetails: string;
};

export type CalendarConnectorBoundaryReviewBoundary = {
  calendarBoundaryReviewOnly: true;
  calendarAccessRequiresExplicitApproval: true;
  calendarEventReadCreateUpdateDeleteFromPageAllowed: false;
  calendarApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  calendarAuthorizationAllowedFromUi: false;
  calendarTokenStorageAllowedFromUi: false;
  privateEventDetailsDisplayedAllowed: false;
  calendarTokensDisplayedAllowed: false;
  automaticCalendarReadsAllowed: false;
  calendarEventCreateAllowedFromUi: false;
  calendarEventUpdateAllowedFromUi: false;
  calendarEventDeleteAllowedFromUi: false;
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

export type CalendarConnectorBoundaryReviewModel = {
  title: "Calendar connector boundary review";
  summary: string;
  reviews: CalendarConnectorBoundaryReview[];
  boundary: CalendarConnectorBoundaryReviewBoundary;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildCalendarConnectorBoundaryReviewStableKey(
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
