export type ReviewInboxFinalConsolidationStatus = "ready-for-review" | "blocked";

export type ReviewInboxFinalConsolidation = {
  id: string;
  finalReviewInboxIdentity: string;
  consolidatedReviewGroups: string[];
  evidenceReviewLane: string[];
  resultReviewLane: string[];
  approvalReviewLane: string[];
  feedbackReviewLane: string[];
  recoveryReviewLane: string[];
  hardeningReviewLane: string[];
  deniedInboxActions: string[];
  unresolvedInboxBlockers: string[];
  releaseReadinessDashboardRoute: string;
  foundation500MilestoneRoute: string;
  nextRecommendedAction: string;
  status: ReviewInboxFinalConsolidationStatus;
  advancedInboxDetails: string;
};

export type ReviewInboxFinalConsolidationBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  reviewInboxFinalConsolidationDoesNotExecuteActions: true;
  inboxActionsRequireExplicitOperatorApproval: true;
  unresolvedInboxBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  actionsApprovedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  localBridgeEndpointCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  feedbackIngestionAllowedFromUi: false;
  recoveryTriggerAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type ReviewInboxFinalConsolidationModel = {
  title: "Review inbox final consolidation";
  summary: string;
  reviews: ReviewInboxFinalConsolidation[];
  boundary: ReviewInboxFinalConsolidationBoundary;
  inboxLanguage: string[];
  advancedDetails: string[];
};

export function buildReviewInboxFinalConsolidationStableKey(
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
