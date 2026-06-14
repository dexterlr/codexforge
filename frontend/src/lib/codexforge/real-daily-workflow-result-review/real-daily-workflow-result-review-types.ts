export type RealDailyWorkflowResultReviewStatus = "ready-for-review" | "blocked";

export type RealDailyWorkflowResultReview = {
  id: string;
  realDailyWorkflowResultIdentity: string;
  resultReviewGroups: string[];
  acceptanceChecklist: string[];
  rejectionChecklist: string[];
  reuseChecklist: string[];
  safetyReviewChecklist: string[];
  deniedResultActions: string[];
  blockedResultRisks: string[];
  realDailyWorkflowRecoveryReviewRoute: string;
  realDailyWorkflowHardeningPassRoute: string;
  nextRecommendedAction: string;
  status: RealDailyWorkflowResultReviewStatus;
  advancedResultDetails: string;
};

export type RealDailyWorkflowResultReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  realDailyWorkflowResultReviewDoesNotStoreLiveOutputs: true;
  realDailyWorkflowResultsRequireOperatorReviewBeforeUse: true;
  unsafeWorkflowResultsRemainBlocked: true;
  outputStorageAllowed: false;
  resultIngestionAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  recoveryTriggerAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type RealDailyWorkflowResultReviewModel = {
  title: "Real daily workflow result review";
  summary: string;
  reviews: RealDailyWorkflowResultReview[];
  boundary: RealDailyWorkflowResultReviewBoundary;
  resultLanguage: string[];
  advancedDetails: string[];
};

export function buildRealDailyWorkflowResultReviewStableKey(
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
