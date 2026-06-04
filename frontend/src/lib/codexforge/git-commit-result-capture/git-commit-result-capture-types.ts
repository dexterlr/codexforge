export type GitCommitResultStatus = "passed" | "failed" | "blocked" | "needs-review";

export type GitCommitResult = {
  id: string;
  resultIdentity: string;
  sourceCommitTrial: string;
  commitStatus: GitCommitResultStatus;
  commitSummary: string;
  commitHashStatus: string;
  validationSummary: string;
  riskSecretsFollowUp: string;
  branchTagHandoffRoute: string;
  reviewInboxHandoff: string;
  recoveryRoute: string;
  blockedReasons: string[];
  advancedResultDetails: string;
};

export type GitCommitResultCaptureBoundary = {
  resultCaptureOnly: true;
  pushOrTagAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  daemonProcessCreationAllowedFromFrontend: false;
  commitCreationAllowedFromUi: false;
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

export type GitCommitResultCaptureModel = {
  title: "Git commit result capture";
  summary: string;
  results: GitCommitResult[];
  boundary: GitCommitResultCaptureBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildGitCommitResultCaptureStableKey(
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
