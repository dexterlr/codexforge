export type DailyBetaOneActivationControlledTrialStatus = "ready-for-review" | "blocked";

export type DailyBetaOneActivationControlledTrial = {
  id: string;
  dailyBetaOneControlledTrialIdentity: string;
  controlledTrialGroups: string[];
  operatorTaskChecklist: string[];
  approvalGateChecklist: string[];
  evidenceResultRecoveryChecklist: string[];
  liveBoundaryChecklist: string[];
  deniedControlledTrialActions: string[];
  unresolvedControlledTrialBlockers: string[];
  feedbackReviewRoute: string;
  regressionReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOneActivationControlledTrialStatus;
  advancedDailyBetaOneActivationControlledTrialDetails: string;
};

export type DailyBetaOneActivationControlledTrialBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  controlledTrialExecutionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  dailyBetaOneActivationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  outputStorageAllowed: false;
  credentialStorageAllowed: false;
};

export type DailyBetaOneActivationControlledTrialModel = {
  title: "Daily Beta 1 activation controlled trial";
  summary: string;
  controlledTrials: DailyBetaOneActivationControlledTrial[];
  boundary: DailyBetaOneActivationControlledTrialBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOneActivationControlledTrialStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
