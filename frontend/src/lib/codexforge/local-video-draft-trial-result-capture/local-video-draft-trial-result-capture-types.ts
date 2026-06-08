export type LocalVideoDraftTrialResultStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "timed out"
  | "needs review";

export type LocalVideoDraftTrialResultCapture = {
  id: string;
  resultIdentity: string;
  sourceKeyframeImageDependency: string;
  generationStatus: LocalVideoDraftTrialResultStatus;
  promptWorkflowSummary: string;
  draftVideoArtifactSummary: string;
  playbackReviewRoute: string;
  safetyRedactionStatus: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type LocalVideoDraftTrialResultCaptureBoundary = {
  videoDraftResultsReviewedBeforePromotion: true;
  rawPromptWorkflowDetailsStaySecondary: true;
  playbackReviewAutoOpenArbitraryFilesAllowed: false;
  memoryAutoPromotionAllowed: false;
  comfyUiJobSubmissionAllowedFromPage: false;
  comfyUiRequestSentFromPageAllowed: false;
  fileMutationAllowedFromUi: false;
  localFileMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
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

export type LocalVideoDraftTrialResultCaptureModel = {
  title: "Local video draft trial result capture";
  summary: string;
  results: LocalVideoDraftTrialResultCapture[];
  boundary: LocalVideoDraftTrialResultCaptureBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalVideoDraftTrialResultCaptureStableKey(
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
