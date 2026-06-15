export type FileMutationBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type FileMutationBoundaryReadinessReview = {
  id: string;
  fileMutationBoundaryIdentity: string;
  mutationBoundaryGroups: string[];
  approvedRootChecklist: string[];
  diffPatchChecklist: string[];
  rollbackChecklist: string[];
  auditEvidenceChecklist: string[];
  deniedFileMutationActions: string[];
  unresolvedFileMutationBlockers: string[];
  testExecutionBoundaryRoute: string;
  unifiedExecutionGapReportRoute: string;
  nextRecommendedAction: string;
  status: FileMutationBoundaryReadinessReviewStatus;
  advancedFileMutationBoundaryDetails: string;
};

export type FileMutationBoundaryReadinessReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryPathCrawlingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FileMutationBoundaryReadinessReviewModel = {
  title: "File mutation boundary readiness review";
  summary: string;
  fileMutationReviews: FileMutationBoundaryReadinessReview[];
  boundary: FileMutationBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFileMutationBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
