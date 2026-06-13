export type BetaWorkflowOnboardingFinalPassStatus = "ready-for-review" | "blocked";

export type BetaWorkflowOnboardingFinalPass = {
  id: string;
  betaWorkflowOnboardingIdentity: string;
  onboardingGroups: string[];
  novicePathChecklist: string[];
  expertPathChecklist: string[];
  safetyExplanationChecklist: string[];
  deniedOnboardingShortcuts: string[];
  unresolvedOnboardingBlockers: string[];
  betaTwoReleaseCandidateRoute: string;
  controlledOperatorTrialRoute: string;
  nextRecommendedAction: string;
  status: BetaWorkflowOnboardingFinalPassStatus;
  advancedOnboardingDetails: string;
};

export type BetaWorkflowOnboardingFinalPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  betaWorkflowOnboardingFinalPassDoesNotLaunchWorkflows: true;
  onboardingChangesRequireExplicitOperatorApproval: true;
  unresolvedOnboardingBlockersStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowLaunchAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
};

export type BetaWorkflowOnboardingFinalPassModel = {
  title: "Beta workflow onboarding final pass";
  summary: string;
  passes: BetaWorkflowOnboardingFinalPass[];
  boundary: BetaWorkflowOnboardingFinalPassBoundary;
  onboardingLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaWorkflowOnboardingFinalPassStableKey(
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
