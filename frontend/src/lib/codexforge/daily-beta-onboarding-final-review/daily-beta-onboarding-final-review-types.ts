export type DailyBetaOnboardingFinalReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaOnboardingFinalReview = {
  id: string;
  dailyBetaOnboardingIdentity: string;
  onboardingGroups: string[];
  noviceOperatorPathChecklist: string[];
  expertOperatorPathChecklist: string[];
  safetyExplanationChecklist: string[];
  handoffChecklist: string[];
  deniedOnboardingShortcuts: string[];
  unresolvedOnboardingBlockers: string[];
  releaseSignoffRoute: string;
  dailyBetaOneCandidateRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaOnboardingFinalReviewStatus;
  advancedOnboardingDetails: string;
};

export type DailyBetaOnboardingFinalReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaOnboardingFinalReviewDoesNotLaunchWorkflows: true;
  onboardingChangesRequireExplicitOperatorApproval: true;
  unresolvedDailyBetaOnboardingBlockersStayBlocked: true;
  onboardingLaunchAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  preferencePersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type DailyBetaOnboardingFinalReviewModel = {
  title: "Daily Beta onboarding final review";
  summary: string;
  reviews: DailyBetaOnboardingFinalReview[];
  boundary: DailyBetaOnboardingFinalReviewBoundary;
  onboardingLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaOnboardingFinalReviewStableKey(
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
