export type RenderJobCancelHoldLiveBoundary = {
  id: string;
  boundaryIdentity: string;
  sourceRenderStatusPollingDependency: string;
  activeJobSummary: string;
  cancelEligibility: string;
  holdEligibility: string;
  deniedActionScope: string;
  requiredConfirmationCopy: string;
  recoveryRoute: string;
  auditHandoff: string;
  blockedReasons: string[];
  advancedBoundaryDetails: string;
};

export type RenderJobCancelHoldLiveBoundaryPolicy = {
  cancelAndHoldRequireExplicitApproval: true;
  cancelAllowedFromPage: false;
  holdAllowedFromPage: false;
  retryAllowedFromPage: false;
  resumeAllowedFromPage: false;
  renderJobSubmissionAllowedFromPage: false;
  renderJobMutationAllowedFromUi: false;
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
  arbitraryLocalEndpointCallsAllowedFromUi: false;
  rawComfyUiPollingLoopsAllowedFromUi: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
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

export type RenderJobCancelHoldLiveBoundaryModel = {
  title: "Render job cancel hold live boundary";
  summary: string;
  boundaries: RenderJobCancelHoldLiveBoundary[];
  policy: RenderJobCancelHoldLiveBoundaryPolicy;
  boundaryLanguage: string[];
  advancedDetails: string[];
};

export function buildRenderJobCancelHoldLiveBoundaryStableKey(
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
