export type ProjectFileSearchPreviewStatus = "review-required" | "ready-for-review" | "blocked";

export type ProjectFileSearchPreview = {
  id: string;
  searchScopeSummary: string;
  trustedWorkspaceDependency: string;
  querySummary: string;
  resultPreviewSummary: string;
  excludedPaths: string;
  sensitiveMatchHandling: string;
  fileOperationApprovalRoute: string;
  indexerRoute: string;
  auditNote: string;
  blockedReasons: string[];
  status: ProjectFileSearchPreviewStatus;
  advancedSearchDetails: string;
};

export type ProjectFileSearchPreviewBoundary = {
  approvedIndexedWorkspaceDataRequired: true;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  autoOpenFilesAllowed: false;
  localActionsWithoutReviewAllowed: false;
  sensitiveMatchesRedactedUntilReview: true;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type ProjectFileSearchPreviewModel = {
  title: "Project file search preview";
  summary: string;
  previews: ProjectFileSearchPreview[];
  boundary: ProjectFileSearchPreviewBoundary;
  searchLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectFileSearchPreviewStableKey(
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
