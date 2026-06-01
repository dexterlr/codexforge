import type { VideoDraftComparisonHandoff } from "./video-draft-comparison-types";

export function buildVideoDraftComparisonHandoff(input: Partial<VideoDraftComparisonHandoff> = {}): VideoDraftComparisonHandoff {
  return {
    id: input.id ?? "video-draft-comparison-handoff",
    copyLabel: input.copyLabel ?? "Copy comparison handoff allowed",
    nextStep: input.nextStep ?? "Next: choose keep, retry, upscale, or finish after real draft evidence exists.",
    safetyNote: input.safetyNote ?? "Comparison does not read files, play fake video, render, or submit jobs.",
  };
}
