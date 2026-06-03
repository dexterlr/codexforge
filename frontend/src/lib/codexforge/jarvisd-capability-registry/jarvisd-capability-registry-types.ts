export type JarvisdCapabilityRiskLevel = "low" | "medium" | "high" | "blocked";
export type JarvisdCapabilityStatus = "reviewable" | "disabled" | "blocked";

export type JarvisdCapabilityRegistryItem = {
  id: string;
  capabilityIdentity: string;
  capabilityCategory: string;
  permissionRequired: string;
  localOnlyStatus: string;
  riskLevel: JarvisdCapabilityRiskLevel;
  auditRequirement: string;
  disabledBlockedReason: string;
  healthDependency: string;
  permissionBoundaryRoute: string;
  runbookHandoff: string;
  status: JarvisdCapabilityStatus;
  advancedCapabilityDetails: string;
};

export type JarvisdCapabilityRegistryBoundary = {
  capabilityExecutionAllowedFromUi: false;
  disabledCapabilityExecutionAllowed: false;
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

export type JarvisdCapabilityRegistryModel = {
  title: "Jarvisd capability registry";
  summary: string;
  capabilities: JarvisdCapabilityRegistryItem[];
  boundary: JarvisdCapabilityRegistryBoundary;
  capabilityLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdCapabilityRegistryStableKey(
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
