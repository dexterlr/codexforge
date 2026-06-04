export type JarvisdRuntimeEnforcementDecision =
  | "allowed"
  | "blocked"
  | "needs-approval"
  | "expired";

export type JarvisdPermissionRuntimeEnforcementReview = {
  id: string;
  enforcementIdentity: string;
  sessionConsentDependency: string;
  permissionBoundaryDependency: string;
  requestedCapability: string;
  allowedRuntimeScope: string[];
  deniedRuntimeScope: string[];
  enforcementDecision: JarvisdRuntimeEnforcementDecision;
  expiryRevocationStatus: string;
  auditHandoff: string;
  blockedReasons: string[];
  advancedEnforcementDetails: string;
};

export type JarvisdPermissionRuntimeEnforcementBoundary = {
  automaticPermissionGrantAllowed: false;
  capabilityExecutionAllowedFromUi: false;
  expiredSessionExecutionAllowed: false;
  localActionWithoutApprovalAllowed: false;
  daemonDirectCallAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  auditLogMutationAllowedFromUi: false;
  appendEventAllowedFromUi: false;
  signingMaterialStorageAllowedInBrowser: false;
  sessionTokenStorageAllowedInBrowser: false;
  settingsAutoImportAllowed: false;
  secretsDisplayedAllowed: false;
  secretsExportedAllowed: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  processEnvDisplayAllowed: false;
  providerRegistryMutationAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdPermissionRuntimeEnforcementModel = {
  title: "Jarvisd permission runtime enforcement";
  summary: string;
  enforcementReviews: JarvisdPermissionRuntimeEnforcementReview[];
  boundary: JarvisdPermissionRuntimeEnforcementBoundary;
  enforcementLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdPermissionRuntimeEnforcementStableKey(
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
