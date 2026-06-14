export type CodexForgeDailyBetaReleaseCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaReleaseCandidate = {
  id: string;
  dailyBetaReleaseCandidateIdentity: string;
  multiWorkflowStatus: string[];
  controlledLiveSignoffStatus: string[];
  dailyWorkflowReadinessStatus: string[];
  approvalSafetyReadinessStatus: string[];
  deniedDailyBetaReleaseActions: string[];
  unresolvedDailyBetaBlockers: string[];
  dailyBetaControlledOperatorTrialRoute: string;
  dailyBetaFeedbackReviewRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaReleaseCandidateStatus;
  advancedDailyBetaReleaseCandidateDetails: string;
};

export type CodexForgeDailyBetaReleaseCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  codexForgeDailyBetaReleaseCandidateDoesNotGoLive: true;
  dailyBetaReleaseRequiresExplicitOperatorApproval: true;
  unresolvedDailyBetaBlockersStayBlocked: true;
  goLiveAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  releaseSettingsPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
};

export type CodexForgeDailyBetaReleaseCandidateModel = {
  title: "CodexForge Daily Beta release candidate";
  summary: string;
  candidates: CodexForgeDailyBetaReleaseCandidate[];
  boundary: CodexForgeDailyBetaReleaseCandidateBoundary;
  dailyBetaReleaseCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaReleaseCandidateStableKey(
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
