import type { VideoSafetyRisk } from "./video-generation-safety-types";

export function buildVideoSafetyRisk(input: Partial<VideoSafetyRisk> = {}): VideoSafetyRisk {
  return {
    id: input.id ?? "video-safety-risk-cloud-cost",
    label: input.label ?? "Cloud cost or credit loss",
    severity: input.severity ?? "medium",
    mitigation:
      input.mitigation ??
      "Keep local-first as the default and require cloud final render review before any future cloud handoff.",
    plainEnglish:
      input.plainEnglish ??
      "Cloud can cost money or credits, so cloud fallback stays review-only until explicitly approved.",
  };
}
