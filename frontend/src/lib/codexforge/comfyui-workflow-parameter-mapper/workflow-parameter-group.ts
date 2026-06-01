import type { WorkflowParameterGroup } from "./workflow-parameter-types";

export function buildWorkflowParameterGroup(input: Partial<WorkflowParameterGroup> = {}): WorkflowParameterGroup {
  return {
    id: input.id ?? "workflow-parameter-group-prompt",
    group: input.group ?? "prompt",
    explanation: input.explanation ?? "Prompt settings are beginner-friendly text choices when kept separate from execution.",
    parameterIds: input.parameterIds ?? ["workflow-parameter-1"],
  };
}
