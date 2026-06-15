export type EndToEndWorkflowRecoveryReviewStatus = "ready-for-review" | "blocked";

export type EndToEndWorkflowRecoveryReview = {
  id: string;
  endToEndWorkflowRecoveryIdentity: string;
  recoveryGroups: string[];
  failureCategories: string[];
  rollbackChecklist: string[];
  escalationChecklist: string[];
  operatorDecisionChecklist: string[];
  deniedRecoveryActions: string[];
  unresolvedRecoveryBlockers: string[];
  endToEndHardeningRoute: string;
  releaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: EndToEndWorkflowRecoveryReviewStatus;
  advancedRecoveryReviewDetails: string;
};

export type EndToEndWorkflowRecoveryReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  recoveryTriggerAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
  outputStorageAllowed: false;
  memoryMutationAllowedFromUi: false;
  credentialStorageAllowed: false;
};

export type EndToEndWorkflowRecoveryReviewModel = {
  title: "End-to-end workflow recovery review";
  summary: string;
  recoveryReviews: EndToEndWorkflowRecoveryReview[];
  boundary: EndToEndWorkflowRecoveryReviewBoundary;
  language: string[];
  advancedDetails: string[];
};

export function buildEndToEndWorkflowRecoveryReviewStableKey(...parts: Array<string | number | null | undefined>): string {
  return parts.map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-")).filter(Boolean).join(":");
}
