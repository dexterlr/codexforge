export type ResearchRunbookFinalizationStatus = "review required" | "blocked";

export type ResearchRunbookFinalization = {
  id: string;
  runbookIdentity: string;
  sourceResearchReleaseCandidate: string;
  approvedResearchWorkflowSummary: string;
  sourceCollectionRules: string[];
  citationRules: string[];
  conflictHandlingRules: string[];
  freshnessRecheckPolicy: string;
  privacyRedactionChecklist: string[];
  operatorChecklist: string[];
  blockedReasons: string[];
  status: ResearchRunbookFinalizationStatus;
  advancedRunbookDetails: string;
};

export type ResearchRunbookFinalizationBoundary = {
  runbookFinalizationReviewOnly: true;
  researchRunbooksReviewedBeforeUse: true;
  runbooksNeverIncludeApiKeysOrSecrets: true;
  runbookFinalizationDoesNotBrowseOrExportAutomatically: true;
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
  sourceAutoRefreshAllowed: false;
  sourceAutoIngestionAllowed: false;
  evidenceAutoIngestionAllowed: false;
  evidenceAutoUpdateAllowed: false;
  evidenceAutoCitationAllowed: false;
  citationAutoFinalizationAllowed: false;
  automaticReportExportAllowed: false;
  reportAutoExportAllowed: false;
  fileExportAllowedFromUi: false;
  freshnessAutoRecheckAllowed: false;
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

export type ResearchRunbookFinalizationModel = {
  title: "Research runbook finalization";
  summary: string;
  runbooks: ResearchRunbookFinalization[];
  boundary: ResearchRunbookFinalizationBoundary;
  runbookLanguage: string[];
  advancedDetails: string[];
};

export function buildResearchRunbookFinalizationStableKey(
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
