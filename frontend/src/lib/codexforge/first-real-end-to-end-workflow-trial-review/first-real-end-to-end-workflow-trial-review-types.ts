export type FirstRealEndToEndWorkflowTrialReviewStatus = "ready-for-review" | "blocked";

export type FirstRealEndToEndWorkflowTrialReview = {
  id: string;
  endToEndWorkflowTrialReviewIdentity: string;
  trialReviewGroups: string[];
  boundaryReadinessChecklist: string[];
  approvalEvidenceResultRecoveryChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedTrialReviewActions: string[];
  unresolvedTrialReviewBlockers: string[];
  endToEndEvidenceReviewRoute: string;
  endToEndResultReviewRoute: string;
  nextRecommendedAction: string;
  status: FirstRealEndToEndWorkflowTrialReviewStatus;
  advancedWorkflowTrialReviewDetails: string;
};

export type FirstRealEndToEndWorkflowTrialReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  workflowExecutionAllowedFromUi: false;
  controlledTrialExecutionAllowedFromUi: false;
  resultAcceptanceAutomationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  outputStorageAllowed: false;
  fileMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type FirstRealEndToEndWorkflowTrialReviewModel = {
  title: "First real end-to-end workflow trial review";
  summary: string;
  workflowTrialReviews: FirstRealEndToEndWorkflowTrialReview[];
  boundary: FirstRealEndToEndWorkflowTrialReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildFirstRealEndToEndWorkflowTrialReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
