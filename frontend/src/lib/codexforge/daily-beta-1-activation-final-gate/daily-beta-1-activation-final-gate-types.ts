export type DailyBetaOneActivationFinalGateStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationFinalGate = {
  id: string;
  dailyBetaOneActivationFinalGateIdentity: string;
  finalGateGroups: string[];
  activationCandidateStatus: string[];
  finalOperatorRegressionRecoveryHardeningStatus: string[];
  liveBoundaryStatus: string[];
  releaseHandoffStatus: string[];
  deniedFinalGateActions: string[];
  unresolvedFinalGateBlockers: string[];
  controlledTrialRoute: string;
  feedbackReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationFinalGateStatus;
  advancedDailyBetaOneActivationFinalGateDetails: string;
};

export type DailyBetaOneActivationFinalGateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  finalGateAutoPassAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  controlledTrialExecutionAllowedFromUi: false;
  releaseCandidateApprovalAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationFinalGateModel = {
  title: "Daily Beta 1 activation final gate";
  summary: string;
  finalGates: DailyBetaOneActivationFinalGate[];
  boundary: DailyBetaOneActivationFinalGateBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationFinalGateStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
