export type JarvisdExecutableCapabilityRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "blocked";

export type JarvisdExecutableCapabilityStatus =
  | "disabled"
  | "blocked"
  | "review-only"
  | "approved-boundary-required";

export type JarvisdCapabilityExecutionRegistryItem = {
  id: string;
  executableCapabilityIdentity: string;
  capabilityCategory: string;
  requiredPermission: string;
  sessionConsentRequirement: string;
  signedRequestRequirement: string;
  auditRequirement: string;
  recoveryRequirement: string;
  riskLevel: JarvisdExecutableCapabilityRiskLevel;
  executionStatus: JarvisdExecutableCapabilityStatus;
  nextRecommendedRoute: string;
  advancedRegistryDetails: string;
};

export type JarvisdCapabilityExecutionRegistryBoundary = {
  capabilityExecutionAllowedFromUi: false;
  disabledCapabilityExecutionAllowed: false;
  approvedBoundaryBypassAllowed: false;
  commandExecutionAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  daemonDirectCallAllowedFromUi: false;
  rawFetchAllowedFromUi: false;
  liveHandshakeAllowedFromUi: false;
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

export type JarvisdCapabilityExecutionRegistryModel = {
  title: "Jarvisd capability execution registry";
  summary: string;
  executableCapabilities: JarvisdCapabilityExecutionRegistryItem[];
  boundary: JarvisdCapabilityExecutionRegistryBoundary;
  registryLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdCapabilityExecutionRegistryStableKey(
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
