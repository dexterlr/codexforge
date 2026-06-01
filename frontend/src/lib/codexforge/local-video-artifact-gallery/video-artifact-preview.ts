import type { VideoArtifactPreview } from "./local-video-artifact-types";

export function buildVideoArtifactPreview(input: Partial<VideoArtifactPreview> = {}): VideoArtifactPreview {
  return {
    id: input.id ?? "video-artifact-preview-draft",
    artifactId: input.artifactId ?? "video-artifact-record-draft",
    placeholder: input.placeholder ?? "Preview appears here after a future approved render supplies an artifact.",
    playbackAllowed: false,
  };
}
