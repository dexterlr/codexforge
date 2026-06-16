export type CodexForgeDailyBetaOneFinalCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneFinalCandidate = {
  id: string;
  dailyBetaOneFinalCandidateIdentity: string;
  readinessLockAuditStatus: string[];
  releaseCandidateSummaryStatus: string[];
  activationFinalGateStatus: string[];
  operatorReadinessStatus: string[];
  deniedFinalCandidateActions: string[];
  unresolvedFinalCandidateBlockers: string[];
  finalOperatorReviewRoute: string;
  finalRegressionReviewRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneFinalCandidateStatus;
  advancedCodexForgeDailyBetaOneFinalCandidateDetails: string;
};

export type CodexForgeDailyBetaOneFinalCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOneActivationAllowedFromUi: false;
  dailyBetaActivationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  activationSettingsPersistenceAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type CodexForgeDailyBetaOneFinalCandidateModel = {
  title: "CodexForge Daily Beta 1 final candidate";
  summary: string;
  finalCandidates: CodexForgeDailyBetaOneFinalCandidate[];
  boundary: CodexForgeDailyBetaOneFinalCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneFinalCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
