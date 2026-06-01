import type { VideoArtifactHandoff } from "./local-video-artifact-types";

export function buildVideoArtifactHandoff(input: Partial<VideoArtifactHandoff> = {}): VideoArtifactHandoff {
  return {
    id: input.id ?? "video-artifact-handoff",
    copyLabel: input.copyLabel ?? "Copy artifact handoff allowed",
    nextStep: input.nextStep ?? "Next: use the video review inbox when a future generated result exists.",
    safetyNote: input.safetyNote ?? "The gallery does not browse arbitrary files, delete files, or play fake generated media.",
  };
}
