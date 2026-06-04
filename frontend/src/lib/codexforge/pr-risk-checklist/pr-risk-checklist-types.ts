export type PrRiskChecklistStatus =
  | "risk-review-required"
  | "ready-for-release-notes-draft"
  | "blocked";

export type PrRiskCheck = {
  id: string;
  riskChecklistIdentity: string;
  sourcePrPrep: string;
  changedAreas: string;
  riskCategories: string[];
  testValidationCoverage: string;
  secretsScanStatus: string;
  migrationConfigEnvRisk: string;
  uxNavigationRisk: string;
  releaseNotesRoute: string;
  blockedReasons: string[];
  status: PrRiskChecklistStatus;
  advancedChecklistDetails: string;
};

export type PrRiskChecklistBoundary = {
  reviewOnly: true;
  automaticMergeApprovalAllowed: false;
  pullRequestCreationAllowedFromUi: false;
  pullRequestMergeAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  branchCreationAllowedFromUi: false;
  tagCreationAllowedFromUi: false;
  pushBranchesTagsAllowedFromUi: false;
  gitCommandExecutionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  releasePublishAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  suspectedSecretsRedacted: true;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  secretsIncludedAllowed: false;
  localStorageApiKeyStorageAllowed: false;
  environmentValuesDisplayedAllowed: false;
  appendEventAllowedFromUi: false;
  saveBrainGraphAllowedFromUi: false;
  brainGraphMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type PrRiskChecklistModel = {
  title: "PR risk checklist";
  summary: string;
  checks: PrRiskCheck[];
  boundary: PrRiskChecklistBoundary;
  checklistLanguage: string[];
  advancedDetails: string[];
};

export function buildPrRiskChecklistStableKey(
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
