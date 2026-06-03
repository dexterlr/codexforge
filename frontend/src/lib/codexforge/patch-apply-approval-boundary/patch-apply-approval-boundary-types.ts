export type PatchApplyApprovalStatus = "review-required" | "not-approved" | "blocked";

export type PatchApplyApprovalRiskLevel = "low" | "medium" | "high" | "blocked";

export type PatchApplyApproval = {
  id: string;
  patchIdentity: string;
  previewStatus: string;
  fileOperationApprovalStatus: string;
  workspaceTrustStatus: string;
  riskSecretsStatus: string;
  approvalCopy: string;
  allowedScope: string;
  deniedScope: string;
  rollbackRecoveryNote: string;
  blockedReasons: string[];
  riskLevel: PatchApplyApprovalRiskLevel;
  status: PatchApplyApprovalStatus;
  advancedApprovalDetails: string;
};

export type PatchApplyApprovalBoundary = {
  patchesAppliedFromPageAllowed: false;
  explicitApprovalRequired: true;
  futureExecutionBehindApprovedLocalBoundary: true;
  jarvisdDirectCallAllowedFromUi: false;
  patchApplyAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  localActionsWithoutReviewAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  secretValuesDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type PatchApplyApprovalBoundaryModel = {
  title: "Patch apply approval boundary";
  summary: string;
  approvals: PatchApplyApproval[];
  boundary: PatchApplyApprovalBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildPatchApplyApprovalBoundaryStableKey(
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
