import type {
  ArtifactThumbnailField,
  ArtifactThumbnailFieldId,
  ArtifactThumbnailGeneratorModel,
  ArtifactThumbnailReadiness,
  ArtifactThumbnailSource,
} from "./artifact-thumbnail-generator-types";

const ARTIFACT_THUMBNAIL_FIELD_COPY: Record<ArtifactThumbnailFieldId, string> = {
  "source artifact":
    "The source artifact is a reviewed local output reference, not a browsed folder or arbitrary file path.",
  "thumbnail status":
    "Thumbnail status is planned-behind-boundary until an approved local generator exists.",
  "preview target":
    "Preview target is the review grid or inbox slot where a safe thumbnail would appear.",
  "generation policy":
    "Generation policy requires local-only processing, reviewed source metadata, and no source overwrite.",
  "local-only boundary":
    "Local-only boundary means thumbnails are generated locally and never uploaded automatically.",
  "retention rule":
    "Retention rule keeps source artifacts and thumbnail references available for review without deletion.",
  "Review inbox handoff":
    "Review inbox handoff sends thumbnail readiness back to the local review inbox before reuse.",
  "failed thumbnail recovery note":
    "Failed thumbnail recovery note explains how to route missing or failed thumbnails without deleting artifacts.",
  "No artifact deletion":
    "No artifact deletion is allowed by the thumbnail generator readiness surface.",
  "no memory auto-promotion":
    "No memory auto-promotion occurs from thumbnails or source artifact metadata.",
  "Source artifacts are never overwritten":
    "Source artifacts are never overwritten; thumbnails must be separate local derivatives when approved.",
  "No thumbnail upload":
    "No thumbnail upload is allowed by default or from this UI.",
};

export function buildArtifactThumbnailSource(): ArtifactThumbnailSource {
  return {
    id: "artifact-thumbnail-source",
    label: "source artifact",
    summary: "Reviewed local output artifact summary for a video draft, image, keyframe, or final candidate.",
    sourceArtifactsAreNeverOverwritten: true,
  };
}

export function buildArtifactThumbnailReadiness(): ArtifactThumbnailReadiness {
  return {
    id: "approved-local-artifact-boundary",
    label: "Thumbnail generation remains behind approved local artifact boundary",
    status: "contract-ready",
    plainEnglish:
      "Thumbnail generation remains behind approved local artifact boundary: this surface defines the safe plan and readiness contract, but it does not browse folders, overwrite source artifacts, upload thumbnails, or run a generator.",
    generatorEnabledInUi: false,
  };
}

export function buildArtifactThumbnailField(id: ArtifactThumbnailFieldId): ArtifactThumbnailField {
  return {
    id,
    label: id,
    plainEnglish: ARTIFACT_THUMBNAIL_FIELD_COPY[id],
  };
}

export function buildArtifactThumbnailFields(): ArtifactThumbnailField[] {
  return (Object.keys(ARTIFACT_THUMBNAIL_FIELD_COPY) as ArtifactThumbnailFieldId[]).map(
    buildArtifactThumbnailField
  );
}

export function buildArtifactThumbnailGeneratorModel(): ArtifactThumbnailGeneratorModel {
  const model: ArtifactThumbnailGeneratorModel = {
    title: "Artifact thumbnail generator",
    summary: "",
    source: buildArtifactThumbnailSource(),
    readiness: buildArtifactThumbnailReadiness(),
    fields: buildArtifactThumbnailFields(),
    thumbnailStatus: "planned-behind-boundary",
    previewTarget: "review grid preview target and video review inbox handoff",
    generationPolicy:
      "Safe thumbnail creation stays local-only, never overwrites source artifacts, and remains review-gated.",
    retentionRule:
      "Retention rule: source artifacts and thumbnail references are kept for review; no deletion happens from this UI.",
    reviewInboxHandoff: "Review inbox handoff: send thumbnail status to /video-review before export or reuse.",
    failedThumbnailRecoveryNote:
      "Failed thumbnail recovery note: show a clear placeholder and route to recovery without deleting the artifact.",
    boundary: {
      localOnly: true,
      arbitraryFolderBrowsingAllowed: false,
      sourceArtifactsOverwritten: false,
      thumbnailUploadAllowed: false,
      artifactDeletionAllowed: false,
      memoryAutoPromotionAllowed: false,
    },
  };

  return { ...model, summary: summarizeArtifactThumbnailGenerator(model) };
}

export function summarizeArtifactThumbnailGenerator(
  model: ArtifactThumbnailGeneratorModel
): string {
  return `${model.title}: ${model.readiness.label}. Source artifacts are never overwritten. Review inbox handoff is required. No thumbnail upload and No artifact deletion.`;
}
