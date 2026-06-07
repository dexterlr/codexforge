export type TestResultCaptureStatus =
  | "passed"
  | "failed"
  | "blocked"
  | "timed out"
  | "needs review";

export type TestResultCapture = {
  id: string;
  resultIdentity: string;
  sourceExecutionTrial: string;
  testStatus: TestResultCaptureStatus;
  commandSummary: string;
  outputSummary: string;
  failureSummary: string;
  environmentSecretsRedactionStatus: string;
  affectedFilesIndicator: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedOutputDetails: string;
};

export type TestResultCaptureBoundary = {
  resultsReviewedBeforePromotionRequired: true;
  rawOutputPrimaryAllowed: false;
  memoryAutoPromotionAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testExecutionFromUiAllowed: false;
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
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  processKillRestartShutdownAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  secretsExportedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type TestResultCaptureModel = {
  title: "Test result capture";
  summary: string;
  results: TestResultCapture[];
  boundary: TestResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildTestResultCaptureStableKey(
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
