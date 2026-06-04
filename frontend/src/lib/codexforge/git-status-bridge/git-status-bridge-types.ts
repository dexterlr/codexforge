export type GitStatusBridgeStatus = "bridge-ready" | "needs-review" | "blocked";

export type GitStatusBridge = {
  id: string;
  bridgeIdentity: string;
  sourceWorkspaceTrust: string;
  commandDryRunDependency: string;
  permissionEnforcementDependency: string;
  branchSummary: string;
  stagedUnstagedSummary: string;
  untrackedFilesSummary: string;
  riskSecretsRedactionStatus: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: GitStatusBridgeStatus;
  advancedStatusDetails: string;
};

export type GitStatusBridgeBoundary = {
  bridgeOnly: true;
  gitStatusRunsFromPageAllowed: false;
  liveGitInspectionWithoutApprovalAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenLocalFilesAllowed: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
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
  secretsIncludedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type GitStatusBridgeModel = {
  title: "Git status bridge";
  summary: string;
  bridges: GitStatusBridge[];
  boundary: GitStatusBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildGitStatusBridgeStableKey(
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
