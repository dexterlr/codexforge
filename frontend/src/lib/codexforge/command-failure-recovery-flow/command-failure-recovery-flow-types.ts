export type CommandFailureCategory =
  | "command failed"
  | "blocked"
  | "timed out"
  | "permission denied"
  | "scope mismatch"
  | "unknown";

export type CommandRetryEligibility = "eligible after review" | "not eligible" | "blocked";

export type CommandFailureRecovery = {
  id: string;
  recoveryIdentity: string;
  sourceCommandResult: string;
  failureCategory: CommandFailureCategory;
  likelyCause: string;
  safeRecoveryChecklist: string[];
  retryEligibility: CommandRetryEligibility;
  blockedRetryReasons: string[];
  affectedScope: string;
  nextRecommendedRoute: string;
  auditHandoff: string;
  advancedRecoveryDetails: string;
};

export type CommandFailureRecoveryBoundary = {
  retryAutomaticAllowed: false;
  recoveryExecutesCommandsAllowed: false;
  processKillRestartShutdownAllowedFromUi: false;
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

export type CommandFailureRecoveryFlowModel = {
  title: "Command failure recovery flow";
  summary: string;
  recoveries: CommandFailureRecovery[];
  boundary: CommandFailureRecoveryBoundary;
  recoveryLanguage: string[];
  advancedDetails: string[];
};

export function buildCommandFailureRecoveryFlowStableKey(
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
