export type GitCommitApprovalBoundaryStatus = "approval-required" | "ready-for-approved-local-boundary" | "blocked";

export type GitCommitApproval = {
  id: string;
  commitApprovalIdentity: string;
  selectedCommitMessage: string;
  gitStatusDependency: string;
  gitDiffDependency: string;
  testResultDependency: string;
  riskSecretsStatus: string;
  allowedScope: string[];
  deniedScope: string[];
  approvalCopy: string;
  blockedReasons: string[];
  status: GitCommitApprovalBoundaryStatus;
  advancedApprovalDetails: string;
};

export type GitCommitApprovalBoundary = {
  finalHumanApprovalGate: true;
  commitCreationRequiresExplicitApproval: true;
  futureGitExecutionBehindApprovedBoundary: true;
  commitCreationAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  secretsIncludedAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  environmentValuesDisplayedAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type GitCommitApprovalBoundaryModel = {
  title: "Git commit approval boundary";
  summary: string;
  approvals: GitCommitApproval[];
  boundary: GitCommitApprovalBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildGitCommitApprovalBoundaryStableKey(
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
