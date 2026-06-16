export type CodexForgeDailyBetaOneActivationReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneActivationReleaseCandidate = {
  id: string;
  dailyBetaOneActivationReleaseCandidateIdentity: string;
  finalGateStatus: string[];
  controlledTrialStatus: string[];
  feedbackRegressionRecoveryHardeningStatus: string[];
  liveBoundaryStatus: string[];
  deniedReleaseCandidateActions: string[];
  unresolvedReleaseCandidateBlockers: string[];
  readinessLockRoute: string;
  checkpointDocsRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneActivationReleaseCandidateStatus;
  advancedCodexForgeDailyBetaOneActivationReleaseCandidateDetails: string;
};

export type CodexForgeDailyBetaOneActivationReleaseCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  goLiveAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  activationSettingsPersistenceAllowedFromUi: false;
  releaseCandidateApprovalAutomationAllowedFromUi: false;
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

export type CodexForgeDailyBetaOneActivationReleaseCandidateModel = {
  title: "CodexForge Daily Beta 1 activation release candidate";
  summary: string;
  releaseCandidates: CodexForgeDailyBetaOneActivationReleaseCandidate[];
  boundary: CodexForgeDailyBetaOneActivationReleaseCandidateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneActivationReleaseCandidateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
