export type GitCommitTrialBoundaryStatus = "trial-ready" | "needs-review" | "blocked";

export type GitCommitTrial = {
  id: string;
  commitTrialIdentity: string;
  gitStatusDependency: string;
  gitDiffDependency: string;
  selectedCommitMessage: string;
  testResultDependency: string;
  riskSecretsStatus: string;
  allowedCommitScope: string[];
  deniedCommitScope: string[];
  requiredConfirmationCopy: string;
  blockedReasons: string[];
  status: GitCommitTrialBoundaryStatus;
  advancedTrialDetails: string;
};

export type GitCommitTrialBoundary = {
  trialOnly: true;
  approvedLocalBoundaryRequiredBeforeCommitCreation: true;
  commitCreationAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
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
  secretsIncludedAllowed: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  apiKeyLocalStorageAllowed: false;
  processEnvDisplayAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type GitCommitTrialBoundaryModel = {
  title: "Git commit trial boundary";
  summary: string;
  trials: GitCommitTrial[];
  boundary: GitCommitTrialBoundary;
  trialLanguage: string[];
  advancedDetails: string[];
};

export function buildGitCommitTrialBoundaryStableKey(
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
