export type RenderJobStatusPollingLiveBridgeStatus =
  | "queued"
  | "running"
  | "complete"
  | "failed"
  | "held"
  | "blocked"
  | "unknown"
  | "needs review";

export type RenderJobStatusPollingLiveBridge = {
  id: string;
  bridgeIdentity: string;
  sourceRenderQueuePersistenceDependency: string;
  approvedLocalBoundaryDependency: string;
  jobIdentitySummary: string;
  pollingPolicy: string;
  timeoutPolicy: string;
  renderStatusSummary: string;
  artifactReadinessSummary: string;
  cancelHoldBoundaryRoute: string;
  blockedReasons: string[];
  advancedStatusDetails: string;
};

export type RenderJobStatusPollingLiveBridgeBoundary = {
  statusPollingRequiresApprovedLocalBoundary: true;
  pollingStartsJobs: false;
  pollingCancelsJobs: false;
  pollingHoldsJobs: false;
  pollingRetriesJobs: false;
  uncontrolledPollingLoopsCreatedFromPage: false;
  renderJobSubmissionAllowedFromPage: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  artifactDeletionAllowed: false;
  patchApplyAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  promptOrFileAutoSendAllowed: false;
  autoSpendTokensAllowed: false;
  tokenSpendAllowedFromUi: false;
  autoRouteLiveProviderTrafficAllowed: false;
  providerRetryAllowedFromUi: false;
  apiKeyExportAllowed: false;
  secretExportAllowed: false;
  apiKeysDisplayedAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsDisplayedAllowed: false;
  apiKeyLocalStorageAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  processEnvDisplayAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type RenderJobStatusPollingLiveBridgeModel = {
  title: "Render job status polling live bridge";
  summary: string;
  bridges: RenderJobStatusPollingLiveBridge[];
  boundary: RenderJobStatusPollingLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildRenderJobStatusPollingLiveBridgeStableKey(
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
