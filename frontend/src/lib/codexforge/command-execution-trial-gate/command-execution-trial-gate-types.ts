export type CommandExecutionTrialStatus = "review-required" | "not-approved" | "blocked";
export type CommandExecutionWorkspaceTrustStatus = "trusted-for-review" | "review-required" | "blocked";

export type CommandExecutionTrial = {
  id: string;
  executionTrialIdentity: string;
  dryRunDependency: string;
  commandApprovalBoundaryDependency: string;
  workspaceTrustStatus: CommandExecutionWorkspaceTrustStatus;
  allowedCommandScope: string;
  deniedCommandScope: string;
  timeoutPolicy: string;
  expectedOutputShape: string;
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: CommandExecutionTrialStatus;
  advancedTrialDetails: string;
};

export type CommandExecutionTrialBoundary = {
  commandsExecutedFromPageAllowed: false;
  approvedLocalBoundaryRequiredBeforeExecution: true;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  shellExecutionWithoutApprovalAllowed: false;
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

export type CommandExecutionTrialGateModel = {
  title: "Command execution trial gate";
  summary: string;
  trials: CommandExecutionTrial[];
  boundary: CommandExecutionTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildCommandExecutionTrialGateStableKey(
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
