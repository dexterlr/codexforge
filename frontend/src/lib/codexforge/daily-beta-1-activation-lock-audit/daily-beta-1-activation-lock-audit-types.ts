export type DailyBetaOneActivationLockAuditStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationLockAudit = {
  id: string;
  dailyBetaOneActivationLockAuditIdentity: string;
  auditGroups: string[];
  finalGateAuditChecklist: string[];
  controlledTrialAuditChecklist: string[];
  feedbackRegressionRecoveryHardeningAuditChecklist: string[];
  releaseCandidateAuditChecklist: string[];
  deniedAuditActions: string[];
  unresolvedAuditBlockers: string[];
  releaseHandoffFinalReviewRoute: string;
  launchReadinessSummaryRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationLockAuditStatus;
  advancedDailyBetaOneActivationLockAuditDetails: string;
};

export type DailyBetaOneActivationLockAuditBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  activationLockAuditAutomationAllowedFromUi: false;
  readinessLockAutomationAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  dryRunExecutionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultPersistenceAllowedFromUi: false;
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

export type DailyBetaOneActivationLockAuditModel = {
  title: "Daily Beta 1 activation lock audit";
  summary: string;
  activationLockAudits: DailyBetaOneActivationLockAudit[];
  boundary: DailyBetaOneActivationLockAuditBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationLockAuditStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
