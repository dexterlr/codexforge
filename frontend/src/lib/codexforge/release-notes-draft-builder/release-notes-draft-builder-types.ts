export type ReleaseNotesDraftBuilderStatus =
  | "draft-review-required"
  | "ready-for-manual-release-review"
  | "blocked";

export type ReleaseNotesDraft = {
  id: string;
  releaseNotesIdentity: string;
  sourceBranchTagHandoff: string;
  prPrepDependency: string;
  userFacingSummary: string;
  technicalSummary: string;
  validationSummary: string;
  knownGaps: string;
  riskNotes: string;
  copyableReleaseNotesDraft: string;
  nextRecommendedRoute: string;
  blockedReasons: string[];
  status: ReleaseNotesDraftBuilderStatus;
  advancedDraftDetails: string;
};

export type ReleaseNotesDraftBuilderBoundary = {
  draftsOnly: true;
  releasePublishAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  branchCreationAllowedFromUi: false;
  pullRequestCreationAllowedFromUi: false;
  pullRequestMergeAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
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

export type ReleaseNotesDraftBuilderModel = {
  title: "Release notes draft builder";
  summary: string;
  drafts: ReleaseNotesDraft[];
  boundary: ReleaseNotesDraftBuilderBoundary;
  draftLanguage: string[];
  advancedDetails: string[];
};

export function buildReleaseNotesDraftBuilderStableKey(
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
