import type { InterpolationResourceEstimate } from "./frame-interpolation-types";

export function buildInterpolationResourceEstimate(input: Partial<InterpolationResourceEstimate> = {}): InterpolationResourceEstimate {
  return {
    id: input.id ?? "interpolation-resource-estimate",
    localGpuTimePosture: input.localGpuTimePosture ?? "Medium local GPU/time posture",
    expectedWait: input.expectedWait ?? "Expect extra wait because the final candidate may contain more frames.",
    costSignal: input.costSignal ?? "Local-first planning avoids cloud spend; GPU time remains a manual operator decision.",
    plainEnglish:
      input.plainEnglish ??
      "Interpolation can be slow because the workstation has to reason about motion between frames. This planner estimates posture only and does not create frames.",
  };
}
