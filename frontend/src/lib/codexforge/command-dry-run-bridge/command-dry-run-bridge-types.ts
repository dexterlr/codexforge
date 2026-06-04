export type CommandDryRunStatus = "review-required" | "blocked";

export type CommandDryRun = {
  id: string;
  dryRunIdentity: string;
  sourceCommandRequest: string;
  workspaceTrustDependency: string;
  commandApprovalDependency: string;
  permissionEnforcementDependency: string;
  commandIntent: string;
  workingDirectoryScope: string;
  expectedEffectSummary: string;
  environmentSecretsSafetyNote: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: CommandDryRunStatus;
  advancedDryRunDetails: string;
};

export type CommandDryRunBoundary = {
  dryRunDoesNotExecuteCommands: true;
  shellExecutionRequiresExplicitApproval: true;
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

export type CommandDryRunBridgeModel = {
  title: "Command dry run bridge";
  summary: string;
  dryRuns: CommandDryRun[];
  boundary: CommandDryRunBoundary;
  dryRunLanguage: string[];
  advancedDetails: string[];
};

export function buildCommandDryRunBridgeStableKey(
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
