import type { UpscaleResourceEstimate } from "./local-upscale-workflow-types";

export function buildUpscaleResourceEstimate(input: Partial<UpscaleResourceEstimate> = {}): UpscaleResourceEstimate {
  return {
    id: input.id ?? "upscale-resource-estimate",
    gpuTimePosture: input.gpuTimePosture ?? "Medium local GPU/time posture",
    expectedWait: input.expectedWait ?? "Expect a longer wait than draft review because every frame may need more pixels.",
    costSignal: input.costSignal ?? "Local-first planning avoids cloud spend; electricity and GPU time remain manual considerations.",
    plainEnglish:
      input.plainEnglish ??
      "Upscaling usually costs time because the workstation has to prepare a larger version of the same video. This planner estimates posture only and does not process video.",
  };
}
