import type { WorkflowResourceRisk } from "./comfyui-workflow-safety-types";

export function buildWorkflowResourceRisk(input: Partial<WorkflowResourceRisk> = {}): WorkflowResourceRisk {
  return {
    id: input.id ?? "workflow-resource-risk-vram",
    resource: input.resource ?? "local VRAM and time",
    riskLabel: input.riskLabel ?? "Estimate before render",
    plainEnglish: input.plainEnglish ?? "Large resolution, long duration, and high frame count can make a local draft slow or unstable.",
  };
}
