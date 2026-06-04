export type CommitMessageBuilderStatus = "draft-review-required" | "ready-for-commit-approval" | "blocked";

export type CommitMessageDraft = {
  id: string;
  commitDraftIdentity: string;
  sourceDiffReview: string;
  changeSummary: string;
  validationSummary: string;
  riskSecretsSummary: string;
  suggestedCommitSubject: string;
  suggestedCommitBodyBullets: string[];
  approvalCopy: string;
  commitApprovalRoute: string;
  blockedReasons: string[];
  status: CommitMessageBuilderStatus;
  advancedCommitDetails: string;
};

export type CommitMessageBuilderBoundary = {
  draftsOnly: true;
  commitCreationAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretsIncludedAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  environmentValuesDisplayedAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type CommitMessageBuilderModel = {
  title: "Commit message builder";
  summary: string;
  drafts: CommitMessageDraft[];
  boundary: CommitMessageBuilderBoundary;
  builderLanguage: string[];
  advancedDetails: string[];
};

export function buildCommitMessageBuilderStableKey(
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
