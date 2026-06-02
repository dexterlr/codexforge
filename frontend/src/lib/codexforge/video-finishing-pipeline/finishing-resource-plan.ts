import type { FinishingResourcePlan } from "./video-finishing-types";

export function buildFinishingResourcePlan(input: Partial<FinishingResourcePlan> = {}): FinishingResourcePlan {
  return {
    id: input.id ?? "finishing-resource-plan",
    gpuTimePosture: input.gpuTimePosture ?? "GPU/time cost depends on upscale and interpolation choices.",
    reviewCost: input.reviewCost ?? "Review is manual and should happen before final-quality work.",
    manualNotes: input.manualNotes ?? "The operator still decides whether local resources are worth spending.",
  };
}
