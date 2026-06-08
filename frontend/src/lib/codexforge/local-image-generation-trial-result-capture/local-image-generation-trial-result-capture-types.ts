export type LocalImageGenerationTrialResultStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "timed out"
  | "needs review";

export type LocalImageGenerationTrialResultCapture = {
  id: string;
  resultIdentity: string;
  sourceSubmitTrial: string;
  generationStatus: LocalImageGenerationTrialResultStatus;
  promptWorkflowSummary: string;
  artifactSummary: string;
  safetyRedactionStatus: string;
  reviewInboxHandoff: string;
  artifactHandoffRoute: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type LocalImageGenerationTrialResultCaptureBoundary = {
  imageResultsReviewedBeforePromotion: true;
  rawPromptWorkflowDetailsStaySecondary: true;
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

export type LocalImageGenerationTrialResultCaptureModel = {
  title: "Local image generation trial result capture";
  summary: string;
  results: LocalImageGenerationTrialResultCapture[];
  boundary: LocalImageGenerationTrialResultCaptureBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalImageGenerationTrialResultCaptureStableKey(
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
