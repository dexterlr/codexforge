import type { VideoReviewHandoff } from "./video-review-inbox-types";

export function buildVideoReviewHandoff(input: Partial<VideoReviewHandoff> = {}): VideoReviewHandoff {
  return {
    id: input.id ?? "video-review-handoff",
    copyLabel: input.copyLabel ?? "Copy review note allowed",
    nextStep: input.nextStep ?? "Next: choose keep, retry, compare, upscale later, interpolate later, or recovery after a real result exists.",
    safetyNote: input.safetyNote ?? "The inbox has no render button, no delete button, and no fake generated results.",
  };
}
