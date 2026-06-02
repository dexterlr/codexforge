export type ArtifactCaptureKind =
  | "local-image"
  | "keyframe"
  | "video-draft"
  | "upscaled-video"
  | "interpolated-video"
  | "final-candidate"
  | "failed-output"
  | "review-note";

export type ArtifactCaptureStatus =
  | "not-captured"
  | "supplied-metadata"
  | "approved-boundary-result"
  | "failed-supplied"
  | "blocked"
  | "unknown";

export type ArtifactCaptureInput = {
  id: string;
  artifactKind: ArtifactCaptureKind;
  sourceRequestId: string;
  sourceWorkflowPackageId: string;
  sourceProvider: string;
  fileLabel: string;
  safeRelativeArtifactPath?: string;
  thumbnailSupplied?: string;
  durationSupplied?: string;
  resolutionSupplied?: string;
  status: ArtifactCaptureStatus;
  reviewNotes: string;
  noFileMutationGuarantee: true;
};

export type ArtifactCaptureRecord = {
  id: string;
  artifactKind: ArtifactCaptureKind;
  label: string;
  provenance: string;
  suppliedMetadata: string[];
  fakeArtifact: false;
};

export type ArtifactCaptureReview = {
  id: string;
  status: ArtifactCaptureStatus;
  reviewRequired: true;
  nextStep: string;
  plainEnglish: string;
};

export type ArtifactCaptureSafety = {
  id: string;
  noArbitraryFilesystemBrowsing: true;
  noDeletion: true;
  noMutation: true;
  noFakeArtifact: true;
  suppliedMetadataMarked: true;
  safeWorkspaceOnly: true;
  plainEnglish: string;
};

export type ArtifactCaptureHandoff = {
  id: string;
  copyLabel: string;
  artifactHandoff: string;
  reviewHandoff: string;
  nextStep: string;
};

export type ArtifactCaptureSummary = {
  input: ArtifactCaptureInput;
  record: ArtifactCaptureRecord;
  review: ArtifactCaptureReview;
  safety: ArtifactCaptureSafety;
  handoff: ArtifactCaptureHandoff;
  summary: string;
};
