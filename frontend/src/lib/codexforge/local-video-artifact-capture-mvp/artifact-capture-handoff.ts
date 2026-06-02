import type {
  ArtifactCaptureHandoff,
  ArtifactCaptureRecord,
  ArtifactCaptureReview,
} from "./local-video-artifact-capture-types";

export function buildArtifactCaptureHandoff(
  record: ArtifactCaptureRecord,
  review: ArtifactCaptureReview
): ArtifactCaptureHandoff {
  return {
    id: `${record.id}-handoff`,
    copyLabel: "Copy artifact handoff allowed",
    artifactHandoff: `Artifact capture ${record.id}: ${record.artifactKind}, ${record.label}, ${record.provenance}.`,
    reviewHandoff: `Artifact review ${review.status}: ${review.nextStep}`,
    nextStep: "Send the captured metadata to video review, recovery, or run history as a manual handoff.",
  };
}
