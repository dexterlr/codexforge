import type { ComfyUiJobArtifactPlan } from "./comfyui-job-package-types";

export function buildComfyUiJobArtifactPlan(input: Partial<ComfyUiJobArtifactPlan> = {}): ComfyUiJobArtifactPlan {
  return {
    id: input.id ?? "comfyui-job-artifact-plan",
    destination: input.destination ?? "planned local video artifacts review area",
    reviewSurface: input.reviewSurface ?? "/video-artifacts",
    deletionAllowed: false,
  };
}
