export type ExportPackageAsset = {
  id: string;
  label: string;
  reason: string;
};

export type ExportPackageChecklistItem = {
  id: string;
  label: string;
  required: true;
};

export type ExportPackageManifestSummary = {
  id: "export-manifest-summary";
  label: "Export manifest summary";
  reviewedArtifact: string;
  selectedDraftVersion: string;
  destinationPolicy: string;
  localByDefault: true;
};

export type ExportPackageReadiness = {
  id: "approved-local-export-boundary";
  label: "Final packaging remains behind approved local export boundary";
  status: "contract-ready";
  plainEnglish: string;
  packagerEnabledInUi: false;
};

export type ExportPackageBuilderBoundary = {
  localOnly: true;
  uploadByDefault: false;
  cloudDestinationAllowed: false;
  secretsAllowed: false;
  artifactDeletionAllowed: false;
  arbitraryFileBrowsingAllowed: false;
  queueMutationAllowed: false;
};

export type ExportPackageBuilderModel = {
  title: "Export package builder MVP";
  summary: string;
  reviewedArtifactSummary: string;
  selectedDraftVersion: string;
  manifest: ExportPackageManifestSummary;
  includedAssets: ExportPackageAsset[];
  excludedAssets: ExportPackageAsset[];
  retentionNote: string;
  reviewChecklist: ExportPackageChecklistItem[];
  destinationPolicy: string;
  handoffCopy: string;
  readiness: ExportPackageReadiness;
  boundary: ExportPackageBuilderBoundary;
};

export function buildExportPackageStableKey(
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
