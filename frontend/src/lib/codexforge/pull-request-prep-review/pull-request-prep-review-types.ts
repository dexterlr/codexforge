export type PullRequestPrepReviewStatus =
  | "prep-review-required"
  | "ready-for-explicit-pr-approval"
  | "blocked";

export type PullRequestPrepReview = {
  id: string;
  prPrepIdentity: string;
  branchTagHandoffDependency: string;
  commitSummary: string;
  changedAreasSummary: string;
  validationSummary: string;
  testResultSummary: string;
  riskSecretsStatus: string;
  suggestedPrTitle: string;
  suggestedPrDescription: string;
  prRiskChecklistRoute: string;
  blockedReasons: string[];
  status: PullRequestPrepReviewStatus;
  advancedPrDetails: string;
};

export type PullRequestPrepReviewBoundary = {
  prepOnly: true;
  pullRequestCreationAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  pushBranchesAllowedFromUi: false;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  releasePublishAllowedFromUi: false;
  mergeAllowedFromUi: false;
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

export type PullRequestPrepReviewModel = {
  title: "Pull request prep review";
  summary: string;
  reviews: PullRequestPrepReview[];
  boundary: PullRequestPrepReviewBoundary;
  prepLanguage: string[];
  advancedDetails: string[];
};

export function buildPullRequestPrepReviewStableKey(
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
