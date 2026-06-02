import type { DraftToFinalResourcePlan } from "./draft-to-final-types";

export function buildDraftToFinalResourcePlan(input: Partial<DraftToFinalResourcePlan> = {}): DraftToFinalResourcePlan {
  return {
    id: input.id ?? "draft-to-final-resource-plan",
    gpuTimePosture: input.gpuTimePosture ?? "Final-quality work can be expensive if upscale and interpolation are both selected.",
    manualCostNote: input.manualCostNote ?? "The operator still decides whether local GPU time is worth spending.",
    plainEnglish:
      input.plainEnglish ??
      "Draft-to-final planning estimates effort only. It does not render, upscale, interpolate frames, or use cloud provider credits.",
  };
}
