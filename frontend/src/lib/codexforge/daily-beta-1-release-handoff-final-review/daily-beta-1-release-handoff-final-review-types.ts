export type DailyBetaOneReleaseHandoffFinalReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOneReleaseHandoffFinalReview = {
  id: string;
  releaseHandoffFinalReviewIdentity: string;
  handoffGroups: string[];
  operatorRunbookSummary: string[];
  finalGateSummary: string[];
  liveBoundaryLimitationSummary: string[];
  launchReadinessChecklist: string[];
  deniedHandoffActions: string[];
  unresolvedHandoffBlockers: string[];
  launchReadinessSummaryRoute: string;
  launchDryRunReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneReleaseHandoffFinalReviewStatus;
  advancedDailyBetaOneReleaseHandoffFinalReviewDetails: string;
};

export type DailyBetaOneReleaseHandoffFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  handoffSendAllowedFromUi: false;
  fileExportAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneReleaseHandoffFinalReviewModel = {
  title: "Daily Beta 1 release handoff final review";
  summary: string;
  releaseHandoffFinalReviews: DailyBetaOneReleaseHandoffFinalReview[];
  boundary: DailyBetaOneReleaseHandoffFinalReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneReleaseHandoffFinalReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
