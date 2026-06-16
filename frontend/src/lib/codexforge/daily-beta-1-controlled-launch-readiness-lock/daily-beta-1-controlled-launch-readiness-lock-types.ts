export type DailyBetaOneControlledLaunchReadinessLockStatus = "ready-for-review" | "blocked";

export type DailyBetaOneControlledLaunchReadinessLock = {
  id: string;
  controlledLaunchReadinessLockIdentity: string;
  lockCriteriaGroups: string[];
  launchReviewChecklist: string[];
  evidenceResultRecoveryHardeningChecklist: string[];
  candidateHandoffChecklist: string[];
  rollbackChecklist: string[];
  deniedReadinessLockActions: string[];
  unresolvedReadinessLockBlockers: string[];
  controlledLaunchCandidateRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneControlledLaunchReadinessLockStatus;
  advancedDailyBetaOneControlledLaunchReadinessLockDetails: string;
};

export type DailyBetaOneControlledLaunchReadinessLockBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  readinessLockAutomationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  controlledLaunchExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  launchApprovalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  credentialStorageAllowed: false;
  outputStorageAllowed: false;
};

export type DailyBetaOneControlledLaunchReadinessLockModel = {
  title: "Daily Beta 1 controlled launch readiness lock";
  summary: string;
  dailyBetaOneControlledLaunchReadinessLocks: DailyBetaOneControlledLaunchReadinessLock[];
  boundary: DailyBetaOneControlledLaunchReadinessLockBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneControlledLaunchReadinessLockStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
