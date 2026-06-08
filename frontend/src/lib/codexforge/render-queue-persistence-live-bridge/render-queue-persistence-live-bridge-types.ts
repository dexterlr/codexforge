export type RenderQueuePersistenceLiveBridgeRenderStatus =
  | "queued"
  | "running"
  | "passed"
  | "failed"
  | "blocked"
  | "cancelled"
  | "needs review";

export type RenderQueuePersistenceLiveBridge = {
  id: string;
  bridgeIdentity: string;
  sourceSubmitTrialGenerationDependency: string;
  queueRecordSummary: string;
  renderStatus: RenderQueuePersistenceLiveBridgeRenderStatus;
  persistenceStatus: string;
  retentionPolicy: string;
  recoveryRoute: string;
  jobStatusPollingRoute: string;
  blockedReasons: string[];
  advancedQueueDetails: string;
};

export type RenderQueuePersistenceLiveBridgeBoundary = {
  renderQueuePersistenceStartsJobs: false;
  retryCancelHoldRequireSeparateApproval: true;
  queueRecordsReviewedBeforePromotion: true;
  jobStartAllowedFromUi: false;
  jobCancelAllowedFromUi: false;
  jobHoldAllowedFromUi: false;
  jobRetryAllowedFromUi: false;
  rawPollingLoopsAllowedFromUi: false;
  queueMutationAllowedFromUi: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  fileMutationAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  localProcessMutationAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
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
  rawFetchAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  packageInstallAllowedFromUi: false;
};

export type RenderQueuePersistenceLiveBridgeModel = {
  title: "Render queue persistence live bridge";
  summary: string;
  bridges: RenderQueuePersistenceLiveBridge[];
  boundary: RenderQueuePersistenceLiveBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildRenderQueuePersistenceLiveBridgeStableKey(
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
