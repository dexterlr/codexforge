export type GitStatusReviewSurfaceStatus = "review-required" | "ready-for-diff-review" | "blocked";

export type GitStatusReview = {
  id: string;
  statusReviewIdentity: string;
  workspaceTrustDependency: string;
  branchSummary: string;
  changedFilesSummary: string;
  untrackedFilesSummary: string;
  stagedUnstagedSummary: string;
  riskSecretsScanStatus: string;
  nextRecommendedRoute: string;
  commandApprovalRoute: string;
  blockedReasons: string[];
  status: GitStatusReviewSurfaceStatus;
  advancedStatusDetails: string;
};

export type GitStatusReviewSurfaceBoundary = {
  reviewOnly: true;
  gitStatusRunsFromPageAllowed: false;
  liveGitInspectionWithoutApprovalAllowed: false;
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

export type GitStatusReviewSurfaceModel = {
  title: "Git status review surface";
  summary: string;
  reviews: GitStatusReview[];
  boundary: GitStatusReviewSurfaceBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildGitStatusReviewSurfaceStableKey(
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
