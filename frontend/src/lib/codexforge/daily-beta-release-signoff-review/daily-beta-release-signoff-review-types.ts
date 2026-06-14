export type DailyBetaReleaseSignoffReviewStatus = "ready-for-review" | "blocked";

export type DailyBetaReleaseSignoffReview = {
  id: string;
  dailyBetaReleaseSignoffIdentity: string;
  signoffGroups: string[];
  hardeningDocsOnboardingStatus: string[];
  controlledLiveCapabilityStatus: string[];
  approvalEvidenceResultRecoveryReadinessChecklist: string[];
  deniedSignoffShortcuts: string[];
  unresolvedReleaseSignoffBlockers: string[];
  dailyBetaOneCandidateRoute: string;
  dailyBetaOneRolloutPlanRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaReleaseSignoffReviewStatus;
  advancedSignoffDetails: string;
};

export type DailyBetaReleaseSignoffReviewBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaReleaseSignoffReviewDoesNotApproveRelease: true;
  releaseSignoffRequiresExplicitOperatorApproval: true;
  unresolvedReleaseSignoffBlockersStayBlocked: true;
  releaseApprovalAllowedFromUi: false;
  releaseSignoffAutomationAllowedFromUi: false;
  releaseSignoffDecisionPersistenceAllowedFromUi: false;
  goLiveAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaReleaseSignoffReviewModel = {
  title: "Daily Beta release signoff review";
  summary: string;
  reviews: DailyBetaReleaseSignoffReview[];
  boundary: DailyBetaReleaseSignoffReviewBoundary;
  signoffLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaReleaseSignoffReviewStableKey(
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
