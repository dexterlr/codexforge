export type JarvisdSettingsReviewStatus =
  | "draft-review"
  | "needs-approval"
  | "blocked";

export type JarvisdSettingsReviewPackage = {
  id: string;
  settingsPackageIdentity: string;
  includedNonSecretSettings: string[];
  excludedSecretFields: string[];
  redactionStatus: string;
  compatibilityNotes: string;
  importRisk: string;
  reviewChecklist: string[];
  approvalRequirement: string;
  rollbackNote: string;
  releaseAuditRoute: string;
  reviewStatus: JarvisdSettingsReviewStatus;
  advancedPackageDetails: string;
};

export type JarvisdSettingsReviewBoundary = {
  secretsExportedAllowed: false;
  secretsDisplayedAllowed: false;
  importsAppliedAutomaticallyAllowed: false;
  settingsAutoExportAllowed: false;
  settingsAutoImportAllowed: false;
  configMutationAllowedFromUi: false;
  providerRegistryMutationAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  arbitraryFileReadOpenAllowed: false;
  fileMutationAllowedFromUi: false;
  fileDeletionAllowedFromUi: false;
  commandExecutionAllowedFromUi: false;
  jarvisdDirectCallAllowedFromUi: false;
  jarvisdCapabilityExecutionAllowedFromUi: false;
  providerApiCallsAllowedFromUi: false;
  githubApiCallsAllowedFromUi: false;
  memoryAutoPromotionAllowed: false;
  brainGraphMutationAllowed: false;
};

export type JarvisdSettingsExportImportReviewModel = {
  title: "Jarvisd settings export import review";
  summary: string;
  packages: JarvisdSettingsReviewPackage[];
  boundary: JarvisdSettingsReviewBoundary;
  reviewLanguage: string[];
  advancedDetails: string[];
};

export function buildJarvisdSettingsExportImportReviewStableKey(
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
