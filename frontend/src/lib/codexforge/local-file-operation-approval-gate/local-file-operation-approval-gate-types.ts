export type LocalFileOperationApprovalType =
  | "read preview"
  | "write patch"
  | "create file"
  | "move file"
  | "delete request"
  | "unknown";

export type LocalFileOperationApprovalRiskLevel = "low" | "medium" | "high" | "blocked";
export type LocalFileOperationApprovalStatus = "review-required" | "not-approved" | "blocked";

export type LocalFileOperationApproval = {
  id: string;
  operationIdentity: string;
  operationType: LocalFileOperationApprovalType;
  targetScopeSummary: string;
  allowedScope: string;
  deniedScope: string;
  riskLevel: LocalFileOperationApprovalRiskLevel;
  approvalCopy: string;
  auditNote: string;
  rollbackRecoveryNote: string;
  blockedReasons: string[];
  status: LocalFileOperationApprovalStatus;
  advancedOperationDetails: string;
};

export type LocalFileOperationApprovalBoundary = {
  fileOperationAutoRunAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  deleteRequestPerformedHereAllowed: false;
  jarvisdDirectCallAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type LocalFileOperationApprovalGateModel = {
  title: "Local file operation approval gate";
  summary: string;
  operations: LocalFileOperationApproval[];
  boundary: LocalFileOperationApprovalBoundary;
  approvalLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalFileOperationApprovalGateStableKey(
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
