export type CodexForgeBetaTwoReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeBetaTwoReleaseCandidate = {
  id: string;
  betaTwoReleaseCandidateIdentity: string;
  regressionStatus: string[];
  safetySignoffStatus: string[];
  documentationStatus: string[];
  onboardingStatus: string[];
  liveWorkflowReadinessStatus: string[];
  deniedReleasePaths: string[];
  unresolvedBetaTwoBlockers: string[];
  controlledOperatorTrialRoute: string;
  operatorFeedbackReviewRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeBetaTwoReleaseCandidateStatus;
  advancedBetaTwoReleaseCandidateDetails: string;
};

export type CodexForgeBetaTwoReleaseCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  codexForgeBetaTwoReleaseCandidateDoesNotGoLive: true;
  betaTwoReleaseRequiresExplicitOperatorApproval: true;
  unresolvedBetaTwoBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  goLiveAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  releaseSettingsPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type CodexForgeBetaTwoReleaseCandidateModel = {
  title: "CodexForge Beta 2 release candidate";
  summary: string;
  candidates: CodexForgeBetaTwoReleaseCandidate[];
  boundary: CodexForgeBetaTwoReleaseCandidateBoundary;
  betaTwoReleaseCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeBetaTwoReleaseCandidateStableKey(
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
