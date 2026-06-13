export type BetaOperatorWorkflowFrictionPatchStatus = "ready-for-review" | "blocked";

export type BetaOperatorWorkflowFrictionPatch = {
  id: string;
  betaWorkflowFrictionPatchIdentity: string;
  frictionCategories: string[];
  candidateImprovementGroups: string[];
  validationChecklist: string[];
  rollbackChecklist: string[];
  deniedPatchActions: string[];
  blockedPatchRisks: string[];
  releaseCandidateRoute: string;
  betaDailyWorkflowRoute: string;
  nextRecommendedAction: string;
  status: BetaOperatorWorkflowFrictionPatchStatus;
  advancedFrictionPatchDetails: string;
};

export type BetaOperatorWorkflowFrictionPatchBoundary = {
  betaOperatorWorkflowFrictionPatchReviewOnly: true;
  betaOperatorWorkflowFrictionPatchDoesNotApplyPatches: true;
  frictionFixesRequireExplicitOperatorApproval: true;
  unsafeFrictionPatchShortcutsStayBlocked: true;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileWriteAllowedFromUi: false;
  testBuildSmokeExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  actionsExecutedFromUi: false;
  workflowExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  connectorApiCallsAllowedFromUi: false;
  localModelCallsAllowedFromUi: false;
  memoryIngestionAllowedFromUi: false;
  approvalDecisionPersistenceAllowedFromUi: false;
};

export type BetaOperatorWorkflowFrictionPatchModel = {
  title: "Beta operator workflow friction patch";
  summary: string;
  patches: BetaOperatorWorkflowFrictionPatch[];
  boundary: BetaOperatorWorkflowFrictionPatchBoundary;
  patchLanguage: string[];
  advancedDetails: string[];
};

export function buildBetaOperatorWorkflowFrictionPatchStableKey(
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
