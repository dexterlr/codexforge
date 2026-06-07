export type PatchApplyTrialRiskStatus = "redacted" | "needs review" | "blocked";

export type PatchApplyTrialStatus = "review required" | "blocked";

export type PatchApplyTrial = {
  id: string;
  trialIdentity: string;
  sourcePatchPreview: string;
  fileWritePatchTrialDependency: string;
  workspaceTrustDependency: string;
  permissionEnforcementDependency: string;
  allowedApplyScope: string;
  deniedApplyScope: string;
  riskSecretsStatus: PatchApplyTrialRiskStatus;
  testPlanDependency: string;
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: PatchApplyTrialStatus;
  advancedTrialDetails: string;
};

export type PatchApplyTrialBoundary = {
  patchesAppliedFromPageAllowed: false;
  approvedLocalBoundaryRequired: true;
  secretValuesRedactedRequired: true;
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
  processKillRestartShutdownAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type PatchApplyTrialBoundaryModel = {
  title: "Patch apply trial boundary";
  summary: string;
  trials: PatchApplyTrial[];
  boundary: PatchApplyTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchApplyTrialBoundaryStableKey(
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
