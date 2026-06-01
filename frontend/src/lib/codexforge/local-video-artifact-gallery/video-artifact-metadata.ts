import type { VideoArtifactMetadata } from "./local-video-artifact-types";

export function buildVideoArtifactMetadata(input: Partial<VideoArtifactMetadata> = {}): VideoArtifactMetadata {
  return {
    id: input.id ?? "video-artifact-metadata-draft",
    artifactId: input.artifactId ?? "video-artifact-record-draft",
    details: input.details ?? ["source package", "review state", "future file reference"],
  };
}
