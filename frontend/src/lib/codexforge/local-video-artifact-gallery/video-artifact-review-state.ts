import type { VideoArtifactReviewState } from "./local-video-artifact-types";

export function buildVideoArtifactReviewState(input: Partial<VideoArtifactReviewState> = {}): VideoArtifactReviewState {
  return {
    id: input.id ?? "video-artifact-review-state-draft",
    artifactId: input.artifactId ?? "video-artifact-record-draft",
    status: input.status ?? "not rendered yet",
    nextStep: input.nextStep ?? "Wait for a future approved artifact, then review it in the video review inbox.",
  };
}
