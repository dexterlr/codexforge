export type DailyBetaOneActivationReadinessLockStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationReadinessLock = {
  id: string;
  dailyBetaOneActivationReadinessLockIdentity: string;
  lockCriteriaGroups: string[];
  finalGateChecklist: string[];
  controlledTrialChecklist: string[];
  feedbackRegressionRecoveryHardeningChecklist: string[];
  releaseCandidateChecklist: string[];
  deniedReadinessLockActions: string[];
  unresolvedReadinessLockBlockers: string[];
  activationReleaseCandidateRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationReadinessLockStatus;
  advancedDailyBetaOneActivationReadinessLockDetails: string;
};

export type DailyBetaOneActivationReadinessLockBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  readinessLockAutomationAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  activationSettingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationReadinessLockModel = {
  title: "Daily Beta 1 activation readiness lock";
  summary: string;
  readinessLocks: DailyBetaOneActivationReadinessLock[];
  boundary: DailyBetaOneActivationReadinessLockBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationReadinessLockStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
