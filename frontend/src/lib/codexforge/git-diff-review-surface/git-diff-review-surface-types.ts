export type GitDiffReviewSurfaceStatus = "review-required" | "ready-for-commit-message" | "blocked";

export type GitDiffReview = {
  id: string;
  diffReviewIdentity: string;
  sourceGitStatusReview: string;
  changedFilesSummary: string;
  diffSummary: string;
  riskSecretsStatus: string;
  testResultDependency: string;
  patchResultDependency: string;
  reviewChecklist: string[];
  commitMessageRoute: string;
  blockedReasons: string[];
  status: GitDiffReviewSurfaceStatus;
  advancedDiffDetails: string;
};

export type GitDiffReviewSurfaceBoundary = {
  reviewOnly: true;
  rawDiffsPrimaryAllowed: false;
  gitDiffRunsFromPageAllowed: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  commitCreationAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
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

export type GitDiffReviewSurfaceModel = {
  title: "Git diff review surface";
  summary: string;
  reviews: GitDiffReview[];
  boundary: GitDiffReviewSurfaceBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildGitDiffReviewSurfaceStableKey(
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
