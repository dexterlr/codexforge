export type JarvisdPermissionRiskLevel = "low" | "medium" | "high" | "blocked";
export type JarvisdPermissionStatus = "review-required" | "not-granted" | "blocked";

export type JarvisdPermissionBoundary = {
  id: string;
  permissionIdentity: string;
  requestedCapability: string;
  allowedScope: string;
  deniedScope: string;
  approvalCopy: string;
  riskLevel: JarvisdPermissionRiskLevel;
  auditNote: string;
  revocationGuidance: string;
  blockedReasons: string[];
  nextRoute: string;
  status: JarvisdPermissionStatus;
  advancedPermissionDetails: string;
};

export type JarvisdPermissionBoundarySafety = {
  automaticPermissionGrantAllowed: false;
  localActionWithoutApprovalAllowed: false;
  secretsRequestedAllowed: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  fileMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  secretsDisplayedAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdPermissionBoundaryModel = {
  title: "Jarvisd permission boundary";
  summary: string;
  permissions: JarvisdPermissionBoundary[];
  boundary: JarvisdPermissionBoundarySafety;
  permissionLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdPermissionBoundaryStableKey(
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
