import type {
  ArtifactCaptureInput,
  ArtifactCaptureRecord,
  ArtifactCaptureReview,
} from "./local-video-artifact-capture-types";

export function buildArtifactCaptureReview(
  input: ArtifactCaptureInput,
  record: ArtifactCaptureRecord
): ArtifactCaptureReview {
  return {
    id: `${record.id}-review`,
    status: input.status,
    reviewRequired: true,
    nextStep:
      input.status === "blocked"
        ? "Keep the artifact record blocked until trustworthy supplied metadata exists."
        : "Review the supplied metadata, then decide whether to send it to video review or recovery.",
    plainEnglish:
      "This capture record is metadata-only. It does not browse arbitrary filesystem paths, delete files, create files, or claim an output exists without supplied evidence.",
  };
}
