export type CodebaseChangePlanRiskLevel = "low" | "medium" | "high" | "blocked";

export type CodebaseChangePlanStatus = "review-required" | "blocked";

export type CodebaseChangePlan = {
  id: string;
  changeRequestSummary: string;
  affectedArea: string;
  projectIndexDependency: string;
  dependencyRiskSignalSummary: string;
  proposedFileTargets: string;
  nonGoals: string;
  riskLevel: CodebaseChangePlanRiskLevel;
  approvalRequirement: string;
  patchPreviewRoute: string;
  blockedReasons: string[];
  status: CodebaseChangePlanStatus;
  advancedPlanDetails: string;
};

export type CodebaseChangePlanBuilderBoundary = {
  approvedProjectIndexRequired: true;
  changePlansModifyFilesAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  livePatchGenerationAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  localActionsWithoutReviewAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretsRedacted: true;
  secretValuesDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type CodebaseChangePlanBuilderModel = {
  title: "Codebase change plan builder";
  summary: string;
  plans: CodebaseChangePlan[];
  boundary: CodebaseChangePlanBuilderBoundary;
  planningLanguage: string[];
  advancedDetails: string[];
};

export function buildCodebaseChangePlanBuilderStableKey(
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
