export type BetaTwoHardeningPassStatus = "ready-for-review" | "blocked";

export type BetaTwoHardeningPass = {
  id: string;
  betaTwoHardeningIdentity: string;
  hardeningGroups: string[];
  regressionSafetyDocsOnboardingTrialFeedbackStatus: string[];
  releaseReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  nextMilestoneRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: BetaTwoHardeningPassStatus;
  advancedHardeningDetails: string;
};

export type BetaTwoHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaTwoHardeningPassDoesNotApplyChanges: true;
  betaTwoHardeningChangesRequireExplicitOperatorApproval: true;
  unresolvedHardeningBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type BetaTwoHardeningPassModel = {
  title: "Beta 2 hardening pass";
  summary: string;
  passes: BetaTwoHardeningPass[];
  boundary: BetaTwoHardeningPassBoundary;
  hardeningLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaTwoHardeningPassStableKey(
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
