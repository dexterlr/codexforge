export type SecretsTokenStorageRegressionSweepStatus = "ready-for-review" | "blocked";

export type SecretsTokenStorageRegressionSweep = {
  id: string;
  secretsSweepIdentity: string;
  tokenStoragePolicy: string[];
  browserStoragePolicy: string[];
  connectorTokenPolicy: string[];
  providerKeyPolicy: string[];
  processEnvPolicy: string[];
  regressionFindingsPreview: string[];
  blockedRisks: string[];
  nextRecommendedRoute: string;
  status: SecretsTokenStorageRegressionSweepStatus;
  advancedSecretsDetails: string;
};

export type SecretsTokenStorageRegressionSweepBoundary = {
  secretsSweepReviewOnly: true;
  secretsAndTokensNeverDisplayedOrStoredHere: true;
  browserTokenStorageRemainsBlocked: true;
  regressionFindingsRequireOperatorReview: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  workflowAutomaticRunAllowed: false;
  approvalAutomationAllowedFromUi: false;
  searchExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  webSearchProviderCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  promptFileProjectConnectorDataAutoSendAllowed: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  buildExecutionFromUiAllowed: false;
  smokeExecutionFromUiAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileExportAllowedFromUi: false;
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
  browserTokenStorageAllowed: false;
  localStorageTokenStorageAllowed: false;
  sessionStorageTokenStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  sessionStorageApiKeyStorageAllowed: false;
  connectorTokenDisplayAllowed: false;
  providerKeyDisplayAllowed: false;
  processEnvDisplayAllowed: false;
  secretsDisplayedAllowed: false;
  packageInstallAllowedFromUi: false;
  routeCoverageRemovalAllowed: false;
  thirdPartyCodeVendoredOrCopied: false;
};

export type SecretsTokenStorageRegressionSweepModel = {
  title: "Secrets token storage regression sweep";
  summary: string;
  sweeps: SecretsTokenStorageRegressionSweep[];
  boundary: SecretsTokenStorageRegressionSweepBoundary;
  secretsLanguage: string[];
  advancedDetails: string[];
};

export function buildSecretsTokenStorageRegressionSweepStableKey(
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
