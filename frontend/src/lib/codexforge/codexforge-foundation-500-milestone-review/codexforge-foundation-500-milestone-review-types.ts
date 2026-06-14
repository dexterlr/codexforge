export type CodexForgeFoundation500MilestoneReviewStatus = "ready-for-review" | "blocked";

export type CodexForgeFoundation500MilestoneReview = {
  id: string;
  foundation500MilestoneIdentity: string;
  milestoneGroups: string[];
  foundationCoverageChecklist: string[];
  liveCapableReviewLaneChecklist: string[];
  beta2ReadinessChecklist: string[];
  checkpointDocsStatus: string[];
  deniedMilestoneActions: string[];
  unresolvedMilestoneBlockers: string[];
  firstRealDailyWorkflowCandidateRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeFoundation500MilestoneReviewStatus;
  advancedMilestoneDetails: string;
};

export type CodexForgeFoundation500MilestoneReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  foundation500MilestoneReviewDoesNotClaimLiveExecution: true;
  milestoneSignoffRequiresExplicitOperatorApproval: true;
  unresolvedMilestoneBlockersStayBlocked: true;
  liveExecutionClaimedFromUi: false;
  milestoneSignoffAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  releaseApprovalAllowedFromUi: false;
  evidenceIngestionAllowedFromUi: false;
  resultIngestionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type CodexForgeFoundation500MilestoneReviewModel = {
  title: "CodexForge Foundation 500 milestone review";
  summary: string;
  reviews: CodexForgeFoundation500MilestoneReview[];
  boundary: CodexForgeFoundation500MilestoneReviewBoundary;
  milestoneLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeFoundation500MilestoneReviewStableKey(
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
