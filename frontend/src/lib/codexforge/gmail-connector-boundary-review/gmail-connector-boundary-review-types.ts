export type GmailConnectorBoundaryReviewStatus = "review required" | "blocked";

export type GmailConnectorBoundaryReview = {
  id: string;
  boundaryIdentity: string;
  sourceConnectorWorkspace: string;
  requestedGmailScopeSummary: string;
  allowedGmailActions: string[];
  deniedGmailActions: string[];
  privacyRedactionPolicy: string[];
  draftSendApprovalRequirement: string;
  evidenceCaptureRoute: string;
  blockedReasons: string[];
  status: GmailConnectorBoundaryReviewStatus;
  advancedGmailDetails: string;
};

export type GmailConnectorBoundaryReviewBoundary = {
  gmailBoundaryReviewOnly: true;
  gmailAccessRequiresExplicitApproval: true;
  emailReadDraftSendFromPageAllowed: false;
  gmailApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  gmailAuthorizationAllowedFromUi: false;
  gmailTokenStorageAllowedFromUi: false;
  messageContentsDisplayedAllowed: false;
  gmailTokensDisplayedAllowed: false;
  automaticEmailReadsAllowed: false;
  emailDraftCreationAllowedFromUi: false;
  emailSendAllowedFromUi: false;
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

export type GmailConnectorBoundaryReviewModel = {
  title: "Gmail connector boundary review";
  summary: string;
  reviews: GmailConnectorBoundaryReview[];
  boundary: GmailConnectorBoundaryReviewBoundary;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildGmailConnectorBoundaryReviewStableKey(
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
