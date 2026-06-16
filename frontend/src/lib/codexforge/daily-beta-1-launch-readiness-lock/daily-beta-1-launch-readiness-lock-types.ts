export type DailyBetaOneLaunchReadinessLockStatus = "ready-for-review" | "blocked";

export type DailyBetaOneLaunchReadinessLock = {
  id: string;
  launchReadinessLockIdentity: string;
  lockCriteriaGroups: string[];
  launchReadinessSummaryChecklist: string[];
  dryRunEvidenceResultChecklist: string[];
  launchCandidateChecklist: string[];
  rollbackChecklist: string[];
  deniedReadinessLockActions: string[];
  unresolvedLaunchReadinessLockBlockers: string[];
  launchCandidateRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneLaunchReadinessLockStatus;
  advancedDailyBetaOneLaunchReadinessLockDetails: string;
};

export type DailyBetaOneLaunchReadinessLockBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  launchReadinessLockAutomationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  launchDryRunExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
  launchSettingsPersistenceAllowedFromUi: false;
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

export type DailyBetaOneLaunchReadinessLockModel = {
  title: "Daily Beta 1 launch readiness lock";
  summary: string;
  launchReadinessLocks: DailyBetaOneLaunchReadinessLock[];
  boundary: DailyBetaOneLaunchReadinessLockBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneLaunchReadinessLockStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
