export type DailyBetaActivationReadinessLockStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationReadinessLock = {
  id: string;
  activationReadinessLockIdentity: string;
  lockCriteriaGroups: string[];
  finalGateChecklist: string[];
  trialFeedbackRegressionHardeningChecklist: string[];
  handoffChecklist: string[];
  rollbackChecklist: string[];
  deniedReadinessLockActions: string[];
  unresolvedReadinessLockBlockers: string[];
  activationCandidateRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationReadinessLockStatus;
  advancedDailyBetaActivationReadinessLockDetails: string;
};

export type DailyBetaActivationReadinessLockBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  readinessLockAutomationAllowedFromUi: false;
  dailyBetaActivationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationReadinessLockModel = {
  title: "Daily Beta activation readiness lock";
  summary: string;
  readinessLocks: DailyBetaActivationReadinessLock[];
  boundary: DailyBetaActivationReadinessLockBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationReadinessLockStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
