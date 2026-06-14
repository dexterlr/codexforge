export type CodexForgeDailyBetaOneCandidateStatus = "ready-for-review" | "blocked";

export type CodexForgeDailyBetaOneCandidate = {
  id: string;
  dailyBetaOneCandidateIdentity: string;
  hardeningDocsOnboardingSignoffStatus: string[];
  multiWorkflowStatus: string[];
  controlledLiveStatus: string[];
  dailyBetaReadinessChecklist: string[];
  deniedDailyBetaOneActions: string[];
  unresolvedDailyBetaOneBlockers: string[];
  dailyBetaOneRolloutPlanRoute: string;
  dailyBetaOneRolloutReviewRoute: string;
  nextRecommendedAction: string;
  status: CodexForgeDailyBetaOneCandidateStatus;
  advancedDailyBetaOneCandidateDetails: string;
};

export type CodexForgeDailyBetaOneCandidateBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  codexForgeDailyBetaOneCandidateDoesNotGoLive: true;
  dailyBetaOneReleaseRequiresExplicitOperatorApproval: true;
  unresolvedDailyBetaOneBlockersStayBlocked: true;
  goLiveAllowedFromUi: false;
  dailyBetaOneLaunchAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  releaseSettingsPersistenceAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type CodexForgeDailyBetaOneCandidateModel = {
  title: "CodexForge Daily Beta 1 candidate";
  summary: string;
  candidates: CodexForgeDailyBetaOneCandidate[];
  boundary: CodexForgeDailyBetaOneCandidateBoundary;
  dailyBetaOneCandidateLanguage: string[];
  advancedDetails: string[];
};

export function buildCodexForgeDailyBetaOneCandidateStableKey(
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
