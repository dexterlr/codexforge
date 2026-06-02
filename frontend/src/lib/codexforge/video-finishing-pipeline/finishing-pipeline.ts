import type { FinishingPipeline } from "./video-finishing-types";
import { buildDefaultFinishingSteps } from "./finishing-step";

export function buildFinishingPipeline(input: Partial<FinishingPipeline> = {}): FinishingPipeline {
  return {
    id: input.id ?? "video-finishing-pipeline",
    title: input.title ?? "Video finishing pipeline",
    steps: input.steps ?? buildDefaultFinishingSteps(),
    localFirstPosture: input.localFirstPosture ?? "Finishing stays local-first and copy-only until future approved execution exists.",
    approvalRequired: input.approvalRequired ?? true,
    noAutoRun: input.noAutoRun ?? true,
  };
}

export function buildDefaultFinishingPipeline(): FinishingPipeline {
  return buildFinishingPipeline();
}
