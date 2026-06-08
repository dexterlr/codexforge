export type ResearchSummaryDraftBuilderStatus = "review required" | "blocked";

export type ResearchSummaryDraft = {
  id: string;
  summaryDraftIdentity: string;
  sourceClaimBuilder: string;
  sourceCitationDraftReview: string;
  draftSummarySections: string[];
  evidenceCoverageSummary: string;
  unresolvedConflicts: string;
  citationReadiness: string;
  reportExportRoute: string;
  blockedReasons: string[];
  status: ResearchSummaryDraftBuilderStatus;
  advancedSummaryDetails: string;
};

export type ResearchSummaryDraftBuilderBoundary = {
  summaryDraftReviewOnly: true;
  summariesDraftsUntilReviewed: true;
  unresolvedConflictsStayVisible: true;
  summariesNotAutoPromotedToMemory: true;
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

export type ResearchSummaryDraftBuilderModel = {
  title: "Research summary draft builder";
  summary: string;
  summaries: ResearchSummaryDraft[];
  boundary: ResearchSummaryDraftBuilderBoundary;
  summaryLanguage: string[];
  advancedDetails: string[];
};

export function buildResearchSummaryDraftBuilderStableKey(
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
