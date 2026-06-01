import type { WorkflowParameterHandoff } from "./workflow-parameter-types";

export function buildWorkflowParameterHandoff(input: Partial<WorkflowParameterHandoff> = {}): WorkflowParameterHandoff {
  return {
    id: input.id ?? "workflow-parameter-handoff",
    copyLabel: input.copyLabel ?? "Copy parameter plan allowed",
    nextStep: input.nextStep ?? "Next: build a ComfyUI job package from reviewed prompt, workflow, safety, and parameter choices.",
    safetyNote: input.safetyNote ?? "The plan does not mutate workflow JSON and does not submit a job.",
  };
}
