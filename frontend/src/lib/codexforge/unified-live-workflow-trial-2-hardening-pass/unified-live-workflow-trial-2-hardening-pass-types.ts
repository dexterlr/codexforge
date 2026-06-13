export type UnifiedLiveWorkflowTrialTwoHardeningPassStatus = "ready-for-review" | "blocked";

export type UnifiedLiveWorkflowTrialTwoHardeningPass = {
  id: string;
  trialTwoHardeningIdentity: string;
  hardeningGroups: string[];
  evidenceResultRecoveryStatus: string[];
  safetyBoundaryChecklist: string[];
  deniedHardeningActions: string[];
  unresolvedHardeningRisks: string[];
  betaDailyWorkflowRoute: string;
  betaWorkflowReviewRoute: string;
  nextRecommendedAction: string;
  status: UnifiedLiveWorkflowTrialTwoHardeningPassStatus;
  advancedHardeningDetails: string;
};

export type UnifiedLiveWorkflowTrialTwoHardeningPassBoundary = {
  trialTwoHardeningPassReviewOnly: true;
  trialTwoHardeningPassDoesNotApplyChanges: true;
  hardeningChangesRequireExplicitOperatorApproval: true;
  unresolvedHardeningRisksStayBlocked: true;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  hardeningApplyAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  providerApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  automationCreationAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type UnifiedLiveWorkflowTrialTwoHardeningPassModel = {
  title: "Unified live workflow trial 2 hardening pass";
  summary: string;
  reviews: UnifiedLiveWorkflowTrialTwoHardeningPass[];
  boundary: UnifiedLiveWorkflowTrialTwoHardeningPassBoundary;
  hardeningLanguage: string[];
  advancedDetails: string[];
};

export function buildUnifiedLiveWorkflowTrialTwoHardeningPassStableKey(
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
