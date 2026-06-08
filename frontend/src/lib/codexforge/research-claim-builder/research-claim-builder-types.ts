export type ResearchClaimBuilderStatus = "review required" | "blocked";

export type ResearchClaimBuilderClaim = {
  id: string;
  claimBuilderIdentity: string;
  sourceEvidenceReviewInbox: string;
  proposedClaimSummary: string;
  supportingEvidenceSummary: string;
  conflictingStaleEvidenceFlags: string;
  confidenceQualitySignal: string;
  citationDraftRoute: string;
  summaryDraftRoute: string;
  blockedReasons: string[];
  status: ResearchClaimBuilderStatus;
  advancedClaimDetails: string;
};

export type ResearchClaimBuilderBoundary = {
  claimBuilderReviewOnly: true;
  claimsReviewedBeforeUse: true;
  conflictingOrStaleEvidenceStaysFlagged: true;
  memoryNotAutoPromoted: true;
  automaticWebBrowsingAllowed: false;
  webBrowsingAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderCallsAllowed: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  promptFileSourceAutoSendAllowed: false;
  sourceAutoSendAllowed: false;
  sourceAutoFetchAllowed: false;
  sourceAutoIngestionAllowed: false;
  evidenceAutoIngestionAllowed: false;
  evidenceAutoCitationAllowed: false;
  citationAutoFinalizationAllowed: false;
  automaticReportExportAllowed: false;
  reportAutoExportAllowed: false;
  fileExportAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  ragIngestionAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  providerRetryAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
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
  jarvisdPermissionAutoGrantAllowed: false;
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
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type ResearchClaimBuilderModel = {
  title: "Research claim builder";
  summary: string;
  claims: ResearchClaimBuilderClaim[];
  boundary: ResearchClaimBuilderBoundary;
  claimLanguage: string[];
  advancedDetails: string[];
};

export function buildResearchClaimBuilderStableKey(
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
