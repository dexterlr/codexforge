export type FileOperationFailureCategory =
  | "approval missing"
  | "scope mismatch"
  | "validation failed"
  | "risk follow-up"
  | "rollback review"
  | "blocked";

export type FileOperationRecovery = {
  id: string;
  recoveryIdentity: string;
  sourceResult: string;
  failureCategory: FileOperationFailureCategory;
  affectedScope: string;
  safeRecoveryChecklist: string[];
  rollbackRecommendation: string;
  retryEligibility: string;
  blockedRetryReasons: string[];
  nextRecommendedRoute: string;
  auditHandoff: string;
  advancedRecoveryDetails: string;
};

export type FileOperationRecoveryBoundary = {
  retryAutomaticAllowed: false;
  recoveryMutationAllowedFromUi: false;
  rollbackRequiresExplicitApprovedBoundary: true;
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
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
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

export type FileOperationRecoveryFlowModel = {
  title: "File operation recovery flow";
  summary: string;
  recoveries: FileOperationRecovery[];
  boundary: FileOperationRecoveryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildFileOperationRecoveryFlowStableKey(
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
