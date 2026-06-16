export type CodexForgeDailyBetaActivationCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaActivationCandidate = {
  id: string;
  dailyBetaActivationCandidateIdentity: string;
  finalGateStatus: string[];
  controlledTrialStatus: string[];
  feedbackRegressionFinalHardeningStatus: string[];
  liveBoundaryStatus: string[];
  deniedActivationCandidateActions: string[];
  unresolvedActivationCandidateBlockers: string[];
  releaseHandoffRoute: string;
  readinessLockRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaActivationCandidateStatus;
  advancedCodexForgeDailyBetaActivationCandidateDetails: string;
};

export type CodexForgeDailyBetaActivationCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  goLiveAllowedFromUi: false;
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

export type CodexForgeDailyBetaActivationCandidateModel = {
  title: "CodexForge Daily Beta activation candidate";
  summary: string;
  activationCandidates: CodexForgeDailyBetaActivationCandidate[];
  boundary: CodexForgeDailyBetaActivationCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaActivationCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
