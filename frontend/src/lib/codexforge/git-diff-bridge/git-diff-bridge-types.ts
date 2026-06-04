export type GitDiffBridgeStatus = "bridge-ready" | "needs-review" | "blocked";

export type GitDiffBridge = {
  id: string;
  bridgeIdentity: string;
  sourceGitStatusBridge: string;
  changedFilesSummary: string;
  diffSummary: string;
  riskSecretsRedactionStatus: string;
  testResultDependency: string;
  patchResultDependency: string;
  commitMessageRoute: string;
  auditHandoff: string;
  blockedReasons: string[];
  status: GitDiffBridgeStatus;
  advancedDiffDetails: string;
};

export type GitDiffBridgeBoundary = {
  bridgeOnly: true;
  rawDiffsPrimaryAllowed: false;
  gitDiffRunsFromPageAllowed: false;
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

export type GitDiffBridgeModel = {
  title: "Git diff bridge";
  summary: string;
  bridges: GitDiffBridge[];
  boundary: GitDiffBridgeBoundary;
  bridgeLanguage: string[];
  advancedDetails: string[];
};

export function buildGitDiffBridgeStableKey(
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
