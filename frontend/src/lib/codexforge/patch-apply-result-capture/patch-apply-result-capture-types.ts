export type PatchApplyResultCaptureStatus = "passed" | "failed" | "blocked" | "needs review";

export type PatchApplyResultCapture = {
  id: string;
  resultIdentity: string;
  sourcePatchApplyTrial: string;
  applyStatus: PatchApplyResultCaptureStatus;
  affectedFilesSummary: string;
  hunkResultSummary: string;
  validationTestSummary: string;
  riskSecretsFollowUp: string;
  rollbackTrialRoute: string;
  reviewInboxHandoff: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type PatchApplyResultCaptureBoundary = {
  resultsReviewedBeforePromotionRequired: true;
  failedPatchAppliesRetainedForRecovery: true;
  memoryAutoPromotionAllowed: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  rollbackAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  runCommandCallAllowedFromUi: false;
  brokerExecutionCallAllowedFromUi: false;
  localExecutorApiCallAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
  packageInstallAllowedFromUi: false;
};

export type PatchApplyResultCaptureModel = {
  title: "Patch apply result capture";
  summary: string;
  results: PatchApplyResultCapture[];
  boundary: PatchApplyResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchApplyResultCaptureStableKey(
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
