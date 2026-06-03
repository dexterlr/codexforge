export type ProjectRiskSecretsSeverity = "low" | "medium" | "high" | "critical" | "blocked";

export type ProjectRiskSecretsScanStatus = "review-required" | "redacted-preview" | "blocked";

export type ProjectRiskSecretsScan = {
  id: string;
  scanScopeSummary: string;
  trustedWorkspaceDependency: string;
  riskCategories: string;
  suspectedSecretIndicator: string;
  redactionStatus: string;
  severity: ProjectRiskSecretsSeverity;
  recommendedAction: string;
  approvalRoute: string;
  auditNote: string;
  blockedReasons: string[];
  status: ProjectRiskSecretsScanStatus;
  advancedFindingDetails: string;
};

export type ProjectRiskSecretsScannerBoundary = {
  scanningBehindApprovedLocalBoundary: true;
  arbitraryLocalScanningAllowed: false;
  arbitraryLocalBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  suspectedSecretsRedacted: true;
  secretValuesDisplayedAllowed: false;
  localActionsWithoutReviewAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  credentialStorageAllowed: false;
  providerRegistryMutationAllowed: false;
  routerPolicyMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
  packageInstallAllowedFromUi: false;
};

export type ProjectRiskSecretsScannerModel = {
  title: "Project risk secrets scanner";
  summary: string;
  scans: ProjectRiskSecretsScan[];
  boundary: ProjectRiskSecretsScannerBoundary;
  scannerLanguage: string[];
  advancedDetails: string[];
};

export function buildProjectRiskSecretsScannerStableKey(
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
