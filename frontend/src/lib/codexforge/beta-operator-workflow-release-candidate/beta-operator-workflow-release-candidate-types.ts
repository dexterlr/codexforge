export type BetaOperatorWorkflowReleaseCandidateStatus = "ready-for-review" | "blocked";

export type BetaOperatorWorkflowReleaseCandidate = {
  id: string;
  betaOperatorWorkflowCandidateIdentity: string;
  dailyWorkflowTrialStatus: string[];
  workflowReviewStatus: string[];
  frictionPatchStatus: string[];
  safetyApprovalReadinessStatus: string[];
  deniedBetaWorkflowPaths: string[];
  unresolvedBetaBlockers: string[];
  nextMilestoneRoute: string;
  operatorCockpitRoute: string;
  nextRecommendedAction: string;
  status: BetaOperatorWorkflowReleaseCandidateStatus;
  advancedReleaseCandidateDetails: string;
};

export type BetaOperatorWorkflowReleaseCandidateBoundary = {
  betaOperatorWorkflowReleaseCandidateReviewOnly: true;
  betaOperatorWorkflowReleaseCandidateDoesNotGoLive: true;
  betaWorkflowReleaseRequiresExplicitOperatorApproval: true;
  unresolvedBetaBlockersStayBlocked: true;
  goLiveAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type BetaOperatorWorkflowReleaseCandidateModel = {
  title: "Beta operator workflow release candidate";
  summary: string;
  candidates: BetaOperatorWorkflowReleaseCandidate[];
  boundary: BetaOperatorWorkflowReleaseCandidateBoundary;
  candidateLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaOperatorWorkflowReleaseCandidateStableKey(
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
