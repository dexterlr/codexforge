export type FoundationReleaseRunbookFinalizationStatus = "review required" | "blocked";

export type FoundationReleaseRunbookFinalization = {
  id: string;
  releaseRunbookIdentity: string;
  sourceFoundationReleaseCandidate: string;
  releaseChecklist: string[];
  validationChecklist: string[];
  rollbackRecoveryChecklist: string[];
  privacySecretsChecklist: string[];
  operatorHandoffChecklist: string[];
  firstRealWorkflowRoute: string;
  blockedReasons: string[];
  status: FoundationReleaseRunbookFinalizationStatus;
  advancedRunbookDetails: string;
};

export type FoundationReleaseRunbookFinalizationBoundary = {
  runbookFinalizationReviewOnly: true;
  releaseRunbooksReviewedBeforeUse: true;
  releaseRunbookFileNotWrittenFromPage: true;
  secretsAndPrivateValuesExcluded: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  promptFileProjectDataAutoSendAllowed: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  releaseShippingExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  runbookExportAllowedFromUi: false;
  runbookFileWriteAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
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
  tokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type FoundationReleaseRunbookFinalizationModel = {
  title: "Foundation release runbook finalization";
  summary: string;
  runbooks: FoundationReleaseRunbookFinalization[];
  boundary: FoundationReleaseRunbookFinalizationBoundary;
  runbookLanguage: string[];
  advancedDetails: string[];
};

export function buildFoundationReleaseRunbookFinalizationStableKey(
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
