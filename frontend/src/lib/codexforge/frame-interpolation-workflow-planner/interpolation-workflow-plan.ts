import type { InterpolationWorkflowPlan } from "./frame-interpolation-types";

export function buildInterpolationWorkflowPlan(input: Partial<InterpolationWorkflowPlan> = {}): InterpolationWorkflowPlan {
  return {
    id: input.id ?? "frame-interpolation-workflow-plan",
    sourceDraft: input.sourceDraft ?? "reviewed local draft placeholder",
    sourceFps: input.sourceFps ?? "24 fps draft",
    targetFps: input.targetFps ?? "30 fps final candidate",
    smoothnessTarget: input.smoothnessTarget ?? "natural",
    outputDuration: input.outputDuration ?? "same duration as the reviewed draft",
    localGpuTimePosture: input.localGpuTimePosture ?? "Medium GPU/time posture; more frames require more work.",
    approvalRequired: input.approvalRequired ?? true,
    noAutoRun: input.noAutoRun ?? true,
  };
}

export function buildDefaultInterpolationWorkflowPlan(): InterpolationWorkflowPlan {
  return buildInterpolationWorkflowPlan();
}
