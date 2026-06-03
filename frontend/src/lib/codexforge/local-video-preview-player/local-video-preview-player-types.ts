export type LocalVideoPreviewFieldId =
  | "Local artifact reference summary"
  | "playback readiness"
  | "source trial"
  | "render job status"
  | "capture status"
  | "review status"
  | "recovery route"
  | "export route"
  | "No upload behavior"
  | "No artifact deletion"
  | "Full local paths stay secondary";

export type LocalVideoPreviewField = {
  id: LocalVideoPreviewFieldId;
  label: string;
  plainEnglish: string;
  shownAboveFold: boolean;
};

export type LocalVideoPreviewArtifactReference = {
  id: "local-video-preview-artifact-reference";
  label: "Local artifact reference summary";
  artifactKind: "video draft";
  shortReference: string;
  fullLocalPathsStaySecondary: true;
};

export type LocalVideoPreviewReadiness = {
  id: "approved-local-artifact-boundary";
  label: "Preview playback remains behind approved local artifact boundary";
  status: "contract-ready";
  plainEnglish: string;
  playbackEnabledInUi: false;
  approvedBoundaryRequired: true;
};

export type LocalVideoPreviewBoundary = {
  localOnly: true;
  playbackSourceAutoOpened: false;
  arbitraryFileBrowsingAllowed: false;
  fullLocalPathsAboveFoldAllowed: false;
  uploadAllowed: false;
  artifactDeletionAllowed: false;
  queueMutationAllowed: false;
  memoryAutoPromotionAllowed: false;
};

export type LocalVideoPreviewPlayerModel = {
  title: "Local video preview player";
  summary: string;
  artifact: LocalVideoPreviewArtifactReference;
  readiness: LocalVideoPreviewReadiness;
  fields: LocalVideoPreviewField[];
  sourceTrial: string;
  renderJobStatus: string;
  captureStatus: string;
  reviewStatus: string;
  recoveryRoute: "/render-queue-recovery";
  exportRoute: "/export-package-builder";
  boundary: LocalVideoPreviewBoundary;
  noUploadBehavior: string;
  noArtifactDeletion: string;
};

export function buildLocalVideoPreviewStableKey(
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
