export type FileWritePatchTrialStatus = "review-required" | "blocked";

export type FileWritePatchTrial = {
  id: string;
  trialGateIdentity: string;
  dryRunDependency: string;
  patchPreviewDependency: string;
  approvalBoundaryDependency: string;
  allowedWriteScope: string;
  deniedWriteScope: string;
  expectedChangedFiles: string;
  rollbackPlan: string;
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: FileWritePatchTrialStatus;
  advancedTrialDetails: string;
};

export type FileWritePatchTrialBoundary = {
  writePatchPerformedFromPageAllowed: false;
  approvedLocalBoundaryRequired: true;
  deleteOperationsRequireSeparateExplicitReview: true;
  fileWriteAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
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

export type FileWritePatchTrialGateModel = {
  title: "File write patch trial gate";
  summary: string;
  trials: FileWritePatchTrial[];
  boundary: FileWritePatchTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildFileWritePatchTrialGateStableKey(
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
