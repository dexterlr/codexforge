import type {
  LocalVideoPreviewArtifactReference,
  LocalVideoPreviewField,
  LocalVideoPreviewFieldId,
  LocalVideoPreviewPlayerModel,
  LocalVideoPreviewReadiness,
} from "./local-video-preview-player-types";

const LOCAL_VIDEO_PREVIEW_FIELD_COPY: Record<LocalVideoPreviewFieldId, string> = {
  "Local artifact reference summary":
    "Local artifact reference summary shows a reviewed draft label and source context without exposing a full local path above the fold.",
  "playback readiness":
    "Playback readiness is contract-ready only; real preview playback stays behind the approved local artifact boundary.",
  "source trial":
    "Source trial records the approved local video draft trial that produced the captured output.",
  "render job status":
    "Render job status is shown as a review label and does not poll, cancel, retry, or mutate the queue from this UI.",
  "capture status":
    "Capture status explains whether local output capture has a reviewed handoff before playback can be enabled.",
  "review status":
    "Review status keeps the draft in a human review lane before comparison, export, retry, or recovery.",
  "recovery route":
    "Recovery route points to the reviewed render queue recovery surface when playback readiness is blocked or unclear.",
  "export route":
    "Export route points to the local export package builder after a reviewed draft is selected.",
  "No upload behavior":
    "No upload behavior: nothing uploads automatically, and this preview model never calls cloud providers.",
  "No artifact deletion":
    "No artifact deletion is allowed from the preview surface; local drafts remain retained for review.",
  "Full local paths stay secondary":
    "Full local paths stay secondary in collapsed or backend-approved detail surfaces, never above the fold.",
};

export function buildLocalVideoPreviewArtifactReference(): LocalVideoPreviewArtifactReference {
  return {
    id: "local-video-preview-artifact-reference",
    label: "Local artifact reference summary",
    artifactKind: "video draft",
    shortReference: "Reviewed local video draft artifact, captured from an approved local trial.",
    fullLocalPathsStaySecondary: true,
  };
}

export function buildLocalVideoPreviewReadiness(): LocalVideoPreviewReadiness {
  return {
    id: "approved-local-artifact-boundary",
    label: "Preview playback remains behind approved local artifact boundary",
    status: "contract-ready",
    plainEnglish:
      "Preview playback remains behind approved local artifact boundary: this page models the player, readiness, and review state, but it does not browse files, auto-open local media, or attach a live playback source.",
    playbackEnabledInUi: false,
    approvedBoundaryRequired: true,
  };
}

export function buildLocalVideoPreviewField(id: LocalVideoPreviewFieldId): LocalVideoPreviewField {
  return {
    id,
    label: id,
    plainEnglish: LOCAL_VIDEO_PREVIEW_FIELD_COPY[id],
    shownAboveFold:
      id !== "Full local paths stay secondary" &&
      id !== "No upload behavior" &&
      id !== "No artifact deletion",
  };
}

export function buildLocalVideoPreviewFields(): LocalVideoPreviewField[] {
  return (Object.keys(LOCAL_VIDEO_PREVIEW_FIELD_COPY) as LocalVideoPreviewFieldId[]).map(
    buildLocalVideoPreviewField
  );
}

export function buildLocalVideoPreviewPlayerModel(): LocalVideoPreviewPlayerModel {
  const model: LocalVideoPreviewPlayerModel = {
    title: "Local video preview player",
    summary: "",
    artifact: buildLocalVideoPreviewArtifactReference(),
    readiness: buildLocalVideoPreviewReadiness(),
    fields: buildLocalVideoPreviewFields(),
    sourceTrial: "source trial: real local video draft trial, reviewed before playback",
    renderJobStatus: "render job status: status label only, no polling or queue mutation from the UI",
    captureStatus: "capture status: local output capture handoff required before playback",
    reviewStatus: "review status: needs human review before compare, retry, or export",
    recoveryRoute: "/render-queue-recovery",
    exportRoute: "/export-package-builder",
    boundary: {
      localOnly: true,
      playbackSourceAutoOpened: false,
      arbitraryFileBrowsingAllowed: false,
      fullLocalPathsAboveFoldAllowed: false,
      uploadAllowed: false,
      artifactDeletionAllowed: false,
      queueMutationAllowed: false,
      memoryAutoPromotionAllowed: false,
    },
    noUploadBehavior: "No upload behavior: nothing uploads automatically from local video preview.",
    noArtifactDeletion: "No artifact deletion: preview never deletes or hides local draft artifacts.",
  };

  return { ...model, summary: summarizeLocalVideoPreviewPlayer(model) };
}

export function summarizeLocalVideoPreviewPlayer(model: LocalVideoPreviewPlayerModel): string {
  return `${model.title}: ${model.artifact.label}, ${model.readiness.label}, ${model.noUploadBehavior}, ${model.noArtifactDeletion}, and Full local paths stay secondary.`;
}
