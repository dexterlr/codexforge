import type { WorkflowSafetyHandoff } from "./comfyui-workflow-safety-types";

export function buildWorkflowSafetyHandoff(input: Partial<WorkflowSafetyHandoff> = {}): WorkflowSafetyHandoff {
  return {
    id: input.id ?? "workflow-safety-handoff",
    copyLabel: input.copyLabel ?? "Copy safety inspection handoff allowed",
    nextStep: input.nextStep ?? "Next: map only the safe editable parameters.",
    safetyNote: input.safetyNote ?? "This handoff is review text only. It does not include a render button, workflow run, or ComfyUI call.",
  };
}
