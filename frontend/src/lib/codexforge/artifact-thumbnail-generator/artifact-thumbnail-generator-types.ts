export type ArtifactThumbnailFieldId =
  | "source artifact"
  | "thumbnail status"
  | "preview target"
  | "generation policy"
  | "local-only boundary"
  | "retention rule"
  | "Review inbox handoff"
  | "failed thumbnail recovery note"
  | "No artifact deletion"
  | "no memory auto-promotion"
  | "Source artifacts are never overwritten"
  | "No thumbnail upload";

export type ArtifactThumbnailField = {
  id: ArtifactThumbnailFieldId;
  label: string;
  plainEnglish: string;
};

export type ArtifactThumbnailReadiness = {
  id: "approved-local-artifact-boundary";
  label: "Thumbnail generation remains behind approved local artifact boundary";
  status: "contract-ready";
  plainEnglish: string;
  generatorEnabledInUi: false;
};

export type ArtifactThumbnailSource = {
  id: "artifact-thumbnail-source";
  label: "source artifact";
  summary: string;
  sourceArtifactsAreNeverOverwritten: true;
};

export type ArtifactThumbnailBoundary = {
  localOnly: true;
  arbitraryFolderBrowsingAllowed: false;
  sourceArtifactsOverwritten: false;
  thumbnailUploadAllowed: false;
  artifactDeletionAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type ArtifactThumbnailGeneratorModel = {
  title: "Artifact thumbnail generator";
  summary: string;
  source: ArtifactThumbnailSource;
  readiness: ArtifactThumbnailReadiness;
  fields: ArtifactThumbnailField[];
  thumbnailStatus: "planned-behind-boundary";
  previewTarget: string;
  generationPolicy: string;
  retentionRule: string;
  reviewInboxHandoff: string;
  failedThumbnailRecoveryNote: string;
  boundary: ArtifactThumbnailBoundary;
};

export function buildArtifactThumbnailStableKey(
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
