import type { VideoArtifactKind, VideoArtifactRecord } from "./local-video-artifact-types";

export function buildVideoArtifactRecord(input: Partial<VideoArtifactRecord> = {}): VideoArtifactRecord {
  return {
    id: input.id ?? "video-artifact-record-draft",
    kind: input.kind ?? "video draft",
    title: input.title ?? "Future local video draft",
    source: input.source ?? "ComfyUI job package preview",
    fileSystemReadAllowed: false,
  };
}

export function buildDefaultVideoArtifactRecords(): VideoArtifactRecord[] {
  const kinds: VideoArtifactKind[] = ["keyframe", "image", "video draft", "upscaled video", "interpolated video", "final export", "workflow package", "review note"];
  return kinds.map((kind, index) =>
    buildVideoArtifactRecord({
      id: `video-artifact-record-${index + 1}`,
      kind,
      title: `${kind} placeholder`,
      source: "future reviewed local output",
    })
  );
}
