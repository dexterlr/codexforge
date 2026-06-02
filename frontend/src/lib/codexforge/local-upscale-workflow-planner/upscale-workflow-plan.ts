import type { UpscaleWorkflowPlan } from "./local-upscale-workflow-types";

export function buildUpscaleWorkflowPlan(input: Partial<UpscaleWorkflowPlan> = {}): UpscaleWorkflowPlan {
  return {
    id: input.id ?? "local-upscale-workflow-plan",
    sourceDraft: input.sourceDraft ?? "reviewed local draft placeholder",
    targetResolution: input.targetResolution ?? "1920x1080 final candidate",
    qualityTarget: input.qualityTarget ?? "balanced",
    artifactDestination: input.artifactDestination ?? "planned local artifact folder",
    localFirstPosture: input.localFirstPosture ?? "Plan stays local-first and does not call a provider.",
    gpuTimePosture: input.gpuTimePosture ?? "Medium GPU/time posture; higher resolution costs more time.",
    approvalRequired: input.approvalRequired ?? true,
    noAutoRun: input.noAutoRun ?? true,
  };
}

export function buildDefaultUpscaleWorkflowPlan(): UpscaleWorkflowPlan {
  return buildUpscaleWorkflowPlan();
}
