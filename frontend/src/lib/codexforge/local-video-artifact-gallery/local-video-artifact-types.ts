export type VideoArtifactKind =
  | "keyframe"
  | "image"
  | "video draft"
  | "upscaled video"
  | "interpolated video"
  | "final export"
  | "workflow package"
  | "review note";

export type VideoArtifactRecord = {
  id: string;
  kind: VideoArtifactKind;
  title: string;
  source: string;
  fileSystemReadAllowed: false;
};

export type VideoArtifactPreview = {
  id: string;
  artifactId: string;
  placeholder: string;
  playbackAllowed: false;
};

export type VideoArtifactMetadata = {
  id: string;
  artifactId: string;
  details: string[];
};

export type VideoArtifactReviewState = {
  id: string;
  artifactId: string;
  status: "not rendered yet" | "needs review" | "kept" | "retry planned" | "unknown";
  nextStep: string;
};

export type VideoArtifactHandoff = {
  id: string;
  copyLabel: string;
  nextStep: string;
  safetyNote: string;
};

export type VideoArtifactGallerySummary = {
  records: VideoArtifactRecord[];
  previews: VideoArtifactPreview[];
  metadata: VideoArtifactMetadata[];
  reviewStates: VideoArtifactReviewState[];
  handoff: VideoArtifactHandoff;
  summary: string;
};
