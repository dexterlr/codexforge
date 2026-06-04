export type FileOperationResultStatus = "passed" | "failed" | "blocked" | "needs review";

export type FileOperationResult = {
  id: string;
  resultIdentity: string;
  sourceTrialGate: string;
  operationStatus: FileOperationResultStatus;
  affectedFilesSummary: string;
  validationSummary: string;
  riskSecretsFollowUp: string;
  rollbackStatus: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type FileOperationResultCaptureBoundary = {
  reviewBeforePromotionRequired: true;
  failedOperationsRetainedForRecovery: true;
  memoryAutoPromotionAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  rawFetchAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
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

export type FileOperationResultCaptureModel = {
  title: "File operation result capture";
  summary: string;
  results: FileOperationResult[];
  boundary: FileOperationResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildFileOperationResultCaptureStableKey(
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
