export type FirstApprovedFilePatchDryRunStatus = "ready-for-review" | "blocked";

export type FirstApprovedFilePatchDryRun = {
  id: string;
  firstApprovedFilePatchDryRunIdentity: string;
  patchDryRunGroups: string[];
  approvedRootChecklist: string[];
  diffPatchChecklist: string[];
  rollbackChecklist: string[];
  testReadinessChecklist: string[];
  deniedPatchDryRunActions: string[];
  unresolvedPatchDryRunBlockers: string[];
  testExecutionBoundaryRoute: string;
  unifiedExecutionGapReportRoute: string;
  nextRecommendedAction: string;
  status: FirstApprovedFilePatchDryRunStatus;
  advancedFilePatchDryRunDetails: string;
};

export type FirstApprovedFilePatchDryRunBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  arbitraryLocalFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type FirstApprovedFilePatchDryRunModel = {
  title: "First approved file patch dry-run";
  summary: string;
  filePatchDryRuns: FirstApprovedFilePatchDryRun[];
  boundary: FirstApprovedFilePatchDryRunBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstApprovedFilePatchDryRunStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
