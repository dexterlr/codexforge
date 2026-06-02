import type { VideoSafetyDecision, VideoSafetyHandoff } from "./video-generation-safety-types";

export function buildVideoSafetyHandoff(
  decision: VideoSafetyDecision,
  input: Partial<VideoSafetyHandoff> = {}
): VideoSafetyHandoff {
  return {
    id: input.id ?? "video-safety-audit-handoff",
    copyLabel: input.copyLabel ?? "Copy safety audit handoff allowed",
    packet:
      input.packet ??
      [
        `Decision: ${decision.status}`,
        "Local health, workflow, queue, artifact, review, recovery, export, cloud, and policy checks reviewed",
        "No generation button exists in this audit",
        "No provider calls are made",
        "Explicit approval required before any future real execution path",
      ],
    safetyNote:
      input.safetyNote ??
      "Copying this audit does not run ComfyUI, submit a queue item, upload assets, call providers, or generate video.",
  };
}
