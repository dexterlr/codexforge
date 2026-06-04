export type BranchTagReleaseHandoffStatus =
  | "handoff-review-required"
  | "ready-for-manual-release-action"
  | "blocked";

export type BranchTagReleaseHandoff = {
  id: string;
  releaseHandoffIdentity: string;
  sourceCommitApproval: string;
  targetBranchSummary: string;
  tagNamingRecommendation: string;
  validationSummary: string;
  riskSecretsStatus: string;
  pushPolicy: string;
  rollbackNote: string;
  releaseNotesRoute: string;
  blockedReasons: string[];
  status: BranchTagReleaseHandoffStatus;
  advancedHandoffDetails: string;
};

export type BranchTagReleaseHandoffBoundary = {
  handoffOnly: true;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  pullRequestCreationAllowedFromUi: false;
  releasePublishAllowedFromUi: false;
  mergeAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
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

export type BranchTagReleaseHandoffModel = {
  title: "Branch tag release handoff";
  summary: string;
  handoffs: BranchTagReleaseHandoff[];
  boundary: BranchTagReleaseHandoffBoundary;
  handoffLanguage: string[];
  advancedDetails: string[];
};

export function buildBranchTagReleaseHandoffStableKey(
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
