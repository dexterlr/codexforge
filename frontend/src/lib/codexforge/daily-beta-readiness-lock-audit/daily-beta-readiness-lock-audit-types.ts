export type DailyBetaReadinessLockAuditStatus = "ready-for-review" | "blocked";

export type DailyBetaReadinessLockAudit = {
  id: string;
  readinessLockAuditIdentity: string;
  auditGroups: string[];
  finalGateAuditChecklist: string[];
  controlledTrialAuditChecklist: string[];
  feedbackRegressionFinalHardeningAuditChecklist: string[];
  releaseHandoffAuditChecklist: string[];
  deniedAuditActions: string[];
  unresolvedAuditBlockers: string[];
  releaseCandidateSummaryRoute: string;
  dailyBetaOneFinalCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaReadinessLockAuditStatus;
  advancedDailyBetaReadinessLockAuditDetails: string;
};

export type DailyBetaReadinessLockAuditBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  readinessLockAuditAutomationAllowedFromUi: false;
  readinessLockAutomationAllowedFromUi: false;
  dailyBetaActivationAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
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

export type DailyBetaReadinessLockAuditModel = {
  title: "Daily Beta readiness lock audit";
  summary: string;
  readinessLockAudits: DailyBetaReadinessLockAudit[];
  boundary: DailyBetaReadinessLockAuditBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaReadinessLockAuditStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
