export type MultiWorkflowReleaseCandidateStatus = "ready-for-review" | "blocked";

export type MultiWorkflowReleaseCandidate = {
  id: string;
  multiWorkflowReleaseCandidateIdentity: string;
  trialPlanStatus: string[];
  trialReviewStatus: string[];
  regressionStatus: string[];
  safetyApprovalReadinessStatus: string[];
  deniedReleaseActions: string[];
  unresolvedReleaseBlockers: string[];
  controlledLiveSignoffRoute: string;
  dailyBetaReleaseCandidateRoute: string;
  nextRecommendedAction: string;
  status: MultiWorkflowReleaseCandidateStatus;
  advancedReleaseCandidateDetails: string;
};

export type MultiWorkflowReleaseCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  multiWorkflowReleaseCandidateDoesNotApproveRelease: true;
  releaseRequiresExplicitOperatorApproval: true;
  unresolvedReleaseBlockersStayBlocked: true;
  releaseApprovalAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type MultiWorkflowReleaseCandidateModel = {
  title: "Multi-workflow release candidate";
  summary: string;
  candidates: MultiWorkflowReleaseCandidate[];
  boundary: MultiWorkflowReleaseCandidateBoundary;
  releaseCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildMultiWorkflowReleaseCandidateStableKey(
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
