export type ProjectDependencyMapStatus = "review-required" | "ready-for-review" | "unknown";

export type ProjectDependencyMap = {
  id: string;
  projectSummary: string;
  dependencySource: string;
  dependencyGroup: string;
  internalModuleRelationship: string;
  externalPackageSummary: string;
  riskNote: string;
  staleUnknownMarker: string;
  commandApprovalRoute: string;
  riskScannerRoute: string;
  blockedReasons: string[];
  status: ProjectDependencyMapStatus;
  advancedDependencyDetails: string;
};

export type ProjectDependencyMapBoundary = {
  approvedIndexedMetadataRequired: true;
  packageInstallAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  shellExecutionAllowedFromUi: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  localActionsWithoutReviewAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type ProjectDependencyMapModel = {
  title: "Project dependency map";
  summary: string;
  maps: ProjectDependencyMap[];
  boundary: ProjectDependencyMapBoundary;
  dependencyLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectDependencyMapStableKey(
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
