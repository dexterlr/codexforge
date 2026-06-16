export type DailyBetaOneLaunchReadinessSummaryStatus = "ready-for-review" | "blocked";

export type DailyBetaOneLaunchReadinessSummary = {
  id: string;
  launchReadinessSummaryIdentity: string;
  summaryGroups: string[];
  activationLockAuditStatus: string[];
  finalHandoffStatus: string[];
  boundaryReadinessStatus: string[];
  operatorReadinessStatus: string[];
  deniedLaunchSummaryActions: string[];
  unresolvedLaunchSummaryBlockers: string[];
  launchDryRunReviewRoute: string;
  launchEvidenceReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneLaunchReadinessSummaryStatus;
  advancedDailyBetaOneLaunchReadinessSummaryDetails: string;
};

export type DailyBetaOneLaunchReadinessSummaryBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  launchApprovalAutomationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  launchSettingsPersistenceAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  launchReadinessLockAutomationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneLaunchReadinessSummaryModel = {
  title: "Daily Beta 1 launch readiness summary";
  summary: string;
  launchReadinessSummaries: DailyBetaOneLaunchReadinessSummary[];
  boundary: DailyBetaOneLaunchReadinessSummaryBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneLaunchReadinessSummaryStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
