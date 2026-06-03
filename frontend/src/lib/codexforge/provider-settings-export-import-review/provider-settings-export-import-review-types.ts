export type ProviderSettingsReviewStatus =
  | "draft-review"
  | "needs-approval"
  | "blocked";

export type ProviderSettingsReviewPackage = {
  id: string;
  settingsPackageSummary: string;
  includedNonSecretSettings: string[];
  excludedSecretFields: string[];
  redactionStatus: string;
  compatibilityNotes: string;
  importRisk: string;
  reviewChecklist: string[];
  approvalRequirement: string;
  applyHandoff: string;
  rollbackNote: string;
  reviewStatus: ProviderSettingsReviewStatus;
  advancedPackageDetails: string;
};

export type ProviderSettingsReviewBoundary = {
  secretsExportedAllowed: false;
  importsAppliedAutomaticallyAllowed: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  providerRegistryMutationAllowed: false;
  providerRegistryWriteAllowedFromUi: false;
  arbitraryFileBrowsingAllowed: false;
  settingsUploadAllowed: false;
  providerApiCallsAllowedFromUi: false;
  automaticProviderSendAllowed: false;
  automaticRoutingAllowed: false;
  tokenSpendAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type ProviderSettingsExportImportReviewModel = {
  title: "Provider settings export import review";
  summary: string;
  packages: ProviderSettingsReviewPackage[];
  boundary: ProviderSettingsReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildProviderSettingsExportImportReviewStableKey(
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
