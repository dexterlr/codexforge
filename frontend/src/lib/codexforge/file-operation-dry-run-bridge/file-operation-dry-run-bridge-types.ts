export type FileOperationDryRunType =
  | "read preview"
  | "write patch"
  | "create file"
  | "move file"
  | "delete request"
  | "unknown";

export type FileOperationDryRunStatus = "review-required" | "blocked";

export type FileOperationDryRun = {
  id: string;
  dryRunIdentity: string;
  sourceOperationRequest: string;
  workspaceTrustDependency: string;
  fileApprovalDependency: string;
  permissionEnforcementDependency: string;
  operationType: FileOperationDryRunType;
  affectedPathScopeSummary: string;
  expectedEffectSummary: string;
  riskSecretsStatus: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: FileOperationDryRunStatus;
  advancedDryRunDetails: string;
};

export type FileOperationDryRunBoundary = {
  dryRunDoesNotMutateFiles: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  directFileReadAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
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

export type FileOperationDryRunBridgeModel = {
  title: "File operation dry run bridge";
  summary: string;
  dryRuns: FileOperationDryRun[];
  boundary: FileOperationDryRunBoundary;
  dryRunLanguage: string[];
  advancedDetails: string[];
};

export function buildFileOperationDryRunBridgeStableKey(
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
