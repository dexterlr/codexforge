export type RealDailyWorkflowEvidenceReviewStatus = "ready-for-review" | "blocked";

export type RealDailyWorkflowEvidenceReview = {
  id: string;
  realDailyWorkflowEvidenceIdentity: string;
  evidenceGroups: string[];
  sourceCitationChecklist: string[];
  redactionPrivacyChecklist: string[];
  approvalGateChecklist: string[];
  deniedEvidenceActions: string[];
  blockedEvidenceRisks: string[];
  realDailyWorkflowResultReviewRoute: string;
  realDailyWorkflowRecoveryReviewRoute: string;
  nextRecommendedAction: string;
  status: RealDailyWorkflowEvidenceReviewStatus;
  advancedEvidenceDetails: string;
};

export type RealDailyWorkflowEvidenceReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  realDailyWorkflowEvidenceReviewDoesNotIngestEvidenceAutomatically: true;
  realDailyWorkflowEvidenceRequiresOperatorReviewBeforeUse: true;
  privateWorkflowEvidenceStaysRedacted: true;
  evidenceIngestionAllowedFromUi: false;
  outputStorageAllowed: false;
  providerOutputStorageAllowed: false;
  localOutputStorageAllowed: false;
  connectorOutputStorageAllowed: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type RealDailyWorkflowEvidenceReviewModel = {
  title: "Real daily workflow evidence review";
  summary: string;
  reviews: RealDailyWorkflowEvidenceReview[];
  boundary: RealDailyWorkflowEvidenceReviewBoundary;
  evidenceLanguage: string[];
  advancedDetails: string[];
};

export function buildRealDailyWorkflowEvidenceReviewStableKey(
  ...parts: Array<string | number | null | undefined>
): string {
  return parts
    .map((part) =>
      String(part ?? "empty")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9._-]+/g, "-")
    )
    .filter(Boolean)
    .join(":");
}
