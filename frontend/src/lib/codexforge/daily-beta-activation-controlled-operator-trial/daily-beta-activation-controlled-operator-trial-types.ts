export type DailyBetaActivationControlledOperatorTrialStatus = "ready-for-review" | "blocked";

export type DailyBetaActivationControlledOperatorTrial = {
  id: string;
  activationControlledOperatorTrialIdentity: string;
  controlledTrialGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  deniedTrialActions: string[];
  unresolvedControlledTrialBlockers: string[];
  feedbackInboxRoute: string;
  regressionReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaActivationControlledOperatorTrialStatus;
  advancedDailyBetaActivationControlledOperatorTrialDetails: string;
};

export type DailyBetaActivationControlledOperatorTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  controlledTrialExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaActivationControlledOperatorTrialModel = {
  title: "Daily Beta activation controlled operator trial";
  summary: string;
  controlledOperatorTrials: DailyBetaActivationControlledOperatorTrial[];
  boundary: DailyBetaActivationControlledOperatorTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaActivationControlledOperatorTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
