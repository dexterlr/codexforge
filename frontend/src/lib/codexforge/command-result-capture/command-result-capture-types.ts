export type CommandResultStatus = "passed" | "failed" | "blocked" | "timed out" | "needs review";

export type CommandResult = {
  id: string;
  resultIdentity: string;
  sourceExecutionTrial: string;
  commandStatus: CommandResultStatus;
  commandSummary: string;
  outputSummary: string;
  environmentSecretsRedactionStatus: string;
  affectedFilesIndicator: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedOutputDetails: string;
};

export type CommandResultCaptureBoundary = {
  resultsReviewedBeforePromotionRequired: true;
  rawOutputPrimaryAllowed: false;
  memoryAutoPromotionAllowed: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
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

export type CommandResultCaptureModel = {
  title: "Command result capture";
  summary: string;
  results: CommandResult[];
  boundary: CommandResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildCommandResultCaptureStableKey(
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
