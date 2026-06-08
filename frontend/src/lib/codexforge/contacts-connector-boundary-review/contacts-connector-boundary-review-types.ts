export type ContactsConnectorBoundaryReviewStatus = "review required" | "blocked";

export type ContactsConnectorBoundaryReview = {
  id: string;
  boundaryIdentity: string;
  sourceConnectorWorkspace: string;
  requestedContactsScopeSummary: string;
  allowedContactsActions: string[];
  deniedContactsActions: string[];
  contactPrivacyPolicy: string[];
  contactMutationApprovalRequirement: string;
  evidenceCaptureRoute: string;
  blockedReasons: string[];
  status: ContactsConnectorBoundaryReviewStatus;
  advancedContactsDetails: string;
};

export type ContactsConnectorBoundaryReviewBoundary = {
  contactsBoundaryReviewOnly: true;
  contactsAccessRequiresExplicitApproval: true;
  contactReadCreateUpdateDeleteFromPageAllowed: false;
  contactsApiCallsAllowedFromUi: false;
  googleApiCallsAllowedFromUi: false;
  oauthRequestFlowAllowedFromUi: false;
  contactsAuthorizationAllowedFromUi: false;
  contactTokenStorageAllowedFromUi: false;
  privateContactDetailsDisplayedAllowed: false;
  contactTokensDisplayedAllowed: false;
  automaticContactReadsAllowed: false;
  contactCreateAllowedFromUi: false;
  contactUpdateAllowedFromUi: false;
  contactDeleteAllowedFromUi: false;
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

export type ContactsConnectorBoundaryReviewModel = {
  title: "Contacts connector boundary review";
  summary: string;
  reviews: ContactsConnectorBoundaryReview[];
  boundary: ContactsConnectorBoundaryReviewBoundary;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildContactsConnectorBoundaryReviewStableKey(
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
