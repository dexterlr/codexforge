export type DailyBetaHardeningPassStatus = "ready-for-review" | "blocked";

export type DailyBetaHardeningPass = {
  id: string;
  dailyBetaHardeningIdentity: string;
  hardeningGroups: string[];
  multiWorkflowReadinessStatus: string[];
  controlledLiveSignoffStatus: string[];
  dailyBetaTrialFeedbackStatus: string[];
  releaseReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  documentationFinalReviewRoute: string;
  onboardingFinalReviewRoute: string;
  nextRecommendedAction: string;
  status: DailyBetaHardeningPassStatus;
  advancedHardeningDetails: string;
};

export type DailyBetaHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  dailyBetaHardeningPassDoesNotApplyChanges: true;
  dailyBetaHardeningChangesRequireExplicitOperatorApproval: true;
  unresolvedDailyBetaHardeningBlockersStayBlocked: true;
  hardeningApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  outputStorageAllowed: false;
};

export type DailyBetaHardeningPassModel = {
  title: "Daily Beta hardening pass";
  summary: string;
  passes: DailyBetaHardeningPass[];
  boundary: DailyBetaHardeningPassBoundary;
  hardeningLanguage: string[];
  advancedDetails: string[];
};

export function buildDailyBetaHardeningPassStableKey(
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
