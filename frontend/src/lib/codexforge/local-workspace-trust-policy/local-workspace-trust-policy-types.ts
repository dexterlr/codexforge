export type LocalWorkspaceTrustStatus = "review-required" | "trusted-for-review" | "blocked";

export type LocalWorkspaceTrustPolicy = {
  id: string;
  workspaceIdentity: string;
  trustStatus: LocalWorkspaceTrustStatus;
  allowedRootsSummary: string;
  deniedRootsSummary: string;
  capabilityScope: string;
  fileOperationPolicy: string;
  commandExecutionPolicy: string;
  processMonitorPolicy: string;
  auditRequirement: string;
  revocationGuidance: string;
  blockedReasons: string[];
  advancedTrustDetails: string;
};

export type LocalWorkspaceTrustPolicyBoundary = {
  trustGrantsPermissionsAutomatically: false;
  localActionsWithoutReviewAllowed: false;
  secretsInspectedAllowed: false;
  secretsDisplayedAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  fileMutationAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  processMutationAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type LocalWorkspaceTrustPolicyModel = {
  title: "Local workspace trust policy";
  summary: string;
  workspaces: LocalWorkspaceTrustPolicy[];
  boundary: LocalWorkspaceTrustPolicyBoundary;
  trustLanguage: string[];
  advancedDetails: string[];
};

export function buildLocalWorkspaceTrustPolicyStableKey(
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
