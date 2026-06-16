export type CodexForgeDailyBetaActivationReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaActivationReleaseCandidate = {
  id: string;
  activationReleaseCandidateIdentity: string;
  checklistStatus: string[];
  dryRunStatus: string[];
  evidenceResultRecoveryHardeningStatus: string[];
  liveBoundaryStatus: string[];
  deniedActivationReleaseActions: string[];
  unresolvedActivationReleaseBlockers: string[];
  operatorReadinessReviewRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaActivationReleaseCandidateStatus;
  advancedCodexForgeDailyBetaActivationReleaseCandidateDetails: string;
};

export type CodexForgeDailyBetaActivationReleaseCandidateBoundary = {
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

export type CodexForgeDailyBetaActivationReleaseCandidateModel = {
  title: "CodexForge Daily Beta activation release candidate";
  summary: string;
  releaseCandidates: CodexForgeDailyBetaActivationReleaseCandidate[];
  boundary: CodexForgeDailyBetaActivationReleaseCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaActivationReleaseCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
