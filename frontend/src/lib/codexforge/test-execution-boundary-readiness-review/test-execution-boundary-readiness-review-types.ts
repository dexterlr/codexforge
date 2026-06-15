export type TestExecutionBoundaryReadinessReviewStatus = "ready-for-review" | "blocked";

export type TestExecutionBoundaryReadinessReview = {
  id: string;
  testExecutionBoundaryIdentity: string;
  testBoundaryGroups: string[];
  allowedCommandChecklist: string[];
  workspaceScopeChecklist: string[];
  timeoutLoggingChecklist: string[];
  rollbackRetryChecklist: string[];
  deniedTestExecutionActions: string[];
  unresolvedTestExecutionBlockers: string[];
  unifiedExecutionGapReportRoute: string;
  firstProviderExecutionTrialRoute: string;
  nextRecommendedAction: string;
  status: TestExecutionBoundaryReadinessReviewStatus;
  advancedTestExecutionBoundaryDetails: string;
};

export type TestExecutionBoundaryReadinessReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  testExecutionFromUiAllowed: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  arbitraryProjectScanningAllowed: false;
  arbitraryLocalFileBrowsingAllowed: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type TestExecutionBoundaryReadinessReviewModel = {
  title: "Test execution boundary readiness review";
  summary: string;
  testExecutionReviews: TestExecutionBoundaryReadinessReview[];
  boundary: TestExecutionBoundaryReadinessReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildTestExecutionBoundaryReadinessReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
