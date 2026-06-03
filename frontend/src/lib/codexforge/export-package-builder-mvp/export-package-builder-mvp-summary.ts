import type {
  ExportPackageAsset,
  ExportPackageBuilderModel,
  ExportPackageChecklistItem,
  ExportPackageManifestSummary,
  ExportPackageReadiness,
} from "./export-package-builder-mvp-types";

export function buildExportPackageIncludedAssets(): ExportPackageAsset[] {
  return [
    {
      id: "selected-draft",
      label: "selected reviewed draft",
      reason: "Selected draft/version is included after review, not auto-published.",
    },
    {
      id: "review-notes",
      label: "review notes",
      reason: "Review notes explain why this draft is ready for local handoff.",
    },
    {
      id: "thumbnail-summary",
      label: "thumbnail summary",
      reason: "Thumbnail summary helps identify the package without uploading a thumbnail.",
    },
    {
      id: "manifest-summary",
      label: "export manifest summary",
      reason: "Manifest summary lists included and excluded assets in plain English.",
    },
  ];
}

export function buildExportPackageExcludedAssets(): ExportPackageAsset[] {
  return [
    {
      id: "secrets",
      label: "secrets and API keys",
      reason: "No secrets are included in a local export handoff package.",
    },
    {
      id: "unreviewed-drafts",
      label: "unreviewed drafts",
      reason: "Unreviewed drafts are retained locally but excluded from the package.",
    },
    {
      id: "full-local-paths",
      label: "full local paths above the fold",
      reason: "Full local paths stay secondary and are not part of the visible package summary.",
    },
  ];
}

export function buildExportPackageChecklist(): ExportPackageChecklistItem[] {
  return [
    { id: "artifact-reviewed", label: "reviewed artifact confirmed", required: true },
    { id: "draft-selected", label: "selected draft/version confirmed", required: true },
    { id: "manifest-reviewed", label: "export manifest summary reviewed", required: true },
    { id: "destination-local", label: "destination policy is local by default", required: true },
    { id: "no-secrets", label: "no secrets included", required: true },
    { id: "no-upload", label: "No upload by default", required: true },
    { id: "no-deletion", label: "No artifact deletion", required: true },
  ];
}

export function buildExportPackageReadiness(): ExportPackageReadiness {
  return {
    id: "approved-local-export-boundary",
    label: "Final packaging remains behind approved local export boundary",
    status: "contract-ready",
    plainEnglish:
      "Final packaging remains behind approved local export boundary: this MVP prepares a reviewed manifest and handoff copy, but it does not browse arbitrary files, package files, upload, publish, store secrets, or delete artifacts.",
    packagerEnabledInUi: false,
  };
}

export function buildExportPackageManifestSummary(): ExportPackageManifestSummary {
  return {
    id: "export-manifest-summary",
    label: "Export manifest summary",
    reviewedArtifact: "reviewed artifact summary: local video draft accepted for packaging",
    selectedDraftVersion: "selected draft/version: reviewed local candidate v1",
    destinationPolicy: "destination policy: local folder handoff only, no cloud upload by default",
    localByDefault: true,
  };
}

export function buildExportPackageBuilderModel(): ExportPackageBuilderModel {
  const manifest = buildExportPackageManifestSummary();
  const model: ExportPackageBuilderModel = {
    title: "Export package builder MVP",
    summary: "",
    reviewedArtifactSummary: manifest.reviewedArtifact,
    selectedDraftVersion: manifest.selectedDraftVersion,
    manifest,
    includedAssets: buildExportPackageIncludedAssets(),
    excludedAssets: buildExportPackageExcludedAssets(),
    retentionNote:
      "Retention note: reviewed artifacts and rejected drafts remain local; this page does not delete artifacts.",
    reviewChecklist: buildExportPackageChecklist(),
    destinationPolicy: "Export package remains local by default. No upload by default and no cloud destination is called from this UI.",
    handoffCopy:
      "Handoff copy: reviewed artifact, selected draft/version, included assets, excluded assets, retention note, review checklist, and destination policy.",
    readiness: buildExportPackageReadiness(),
    boundary: {
      localOnly: true,
      uploadByDefault: false,
      cloudDestinationAllowed: false,
      secretsAllowed: false,
      artifactDeletionAllowed: false,
      arbitraryFileBrowsingAllowed: false,
      queueMutationAllowed: false,
    },
  };

  return { ...model, summary: summarizeExportPackageBuilder(model) };
}

export function summarizeExportPackageBuilder(model: ExportPackageBuilderModel): string {
  return `${model.title}: Export package remains local by default. ${model.readiness.label}. ${model.manifest.label}. Handoff copy is review-gated. No upload by default, no secrets, and no deletion.`;
}
