export type RealDailyWorkflowHardeningPassStatus = "ready-for-review" | "blocked";

export type RealDailyWorkflowHardeningPass = {
  id: string;
  realDailyWorkflowHardeningIdentity: string;
  hardeningGroups: string[];
  evidenceResultRecoveryReadinessStatus: string[];
  approvalSafetyReadinessChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningBlockers: string[];
  multiWorkflowTrialPlanRoute: string;
  releaseReadinessDashboardRoute: string;
  nextRecommendedAction: string;
  status: RealDailyWorkflowHardeningPassStatus;
  advancedHardeningDetails: string;
};

export type RealDailyWorkflowHardeningPassBoundary = {
  reviewOnly: true;
  approvalRequired: true;
  realDailyWorkflowHardeningPassDoesNotApplyChanges: true;
  hardeningChangesRequireExplicitOperatorApproval: true;
  unresolvedHardeningBlockersStayBlocked: true;
  hardeningApplyAllowedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  memoryMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  recoveryTriggerAllowedFromUi: false;
  settingsPersistenceAllowedFromUi: false;
};

export type RealDailyWorkflowHardeningPassModel = {
  title: "Real daily workflow hardening pass";
  summary: string;
  reviews: RealDailyWorkflowHardeningPass[];
  boundary: RealDailyWorkflowHardeningPassBoundary;
  hardeningLanguage: string[];
  advancedDetails: string[];
};

export function buildRealDailyWorkflowHardeningPassStableKey(
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
