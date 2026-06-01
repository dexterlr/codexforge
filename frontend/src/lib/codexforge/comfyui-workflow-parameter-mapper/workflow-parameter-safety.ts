import type { WorkflowParameterSafety } from "./workflow-parameter-types";

export function buildWorkflowParameterSafety(input: Partial<WorkflowParameterSafety> = {}): WorkflowParameterSafety {
  return {
    id: input.id ?? "workflow-parameter-safety-safe-editable",
    level: input.level ?? "safe editable",
    explanation: input.explanation ?? "A beginner can change this value in the plan without modifying the workflow file.",
  };
}
