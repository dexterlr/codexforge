export type PatchRollbackTrialStatus = "review required" | "blocked";

export type PatchRollbackTrial = {
  id: string;
  rollbackTrialIdentity: string;
  sourcePatchApplyResult: string;
  rollbackReason: string;
  affectedFilesSummary: string;
  allowedRollbackScope: string;
  deniedRollbackScope: string;
  recoveryChecklist: string[];
  requiredConfirmationCopy: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: PatchRollbackTrialStatus;
  advancedRollbackDetails: string;
};

export type PatchRollbackTrialBoundary = {
  rollbackPerformedFromPageAllowed: false;
  approvedLocalBoundaryRequired: true;
  unrelatedFileDeletionAllowed: false;
  patchApplyAllowedFromUi: false;
  rollbackAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
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
  memoryAutoPromotionAllowed: false;
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

export type PatchRollbackTrialBoundaryModel = {
  title: "Patch rollback trial boundary";
  summary: string;
  trials: PatchRollbackTrial[];
  boundary: PatchRollbackTrialBoundary;
  rollbackLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchRollbackTrialBoundaryStableKey(
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
