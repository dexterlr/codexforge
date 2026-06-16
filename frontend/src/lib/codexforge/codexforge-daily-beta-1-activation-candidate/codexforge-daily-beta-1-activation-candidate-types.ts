export type CodexForgeDailyBetaOneActivationCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneActivationCandidate = {
  id: string;
  dailyBetaOneActivationCandidateIdentity: string;
  readinessLockAuditStatus: string[];
  releaseCandidateSummaryStatus: string[];
  finalOperatorRegressionRecoveryHardeningStatus: string[];
  liveBoundaryStatus: string[];
  deniedActivationCandidateActions: string[];
  unresolvedActivationCandidateBlockers: string[];
  checkpointDocsRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneActivationCandidateStatus;
  advancedCodexForgeDailyBetaOneActivationCandidateDetails: string;
};

export type CodexForgeDailyBetaOneActivationCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  goLiveAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  dailyBetaActivationAllowedFromUi: false;
  activationSettingsPersistenceAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
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

export type CodexForgeDailyBetaOneActivationCandidateModel = {
  title: "CodexForge Daily Beta 1 activation candidate";
  summary: string;
  activationCandidates: CodexForgeDailyBetaOneActivationCandidate[];
  boundary: CodexForgeDailyBetaOneActivationCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneActivationCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
