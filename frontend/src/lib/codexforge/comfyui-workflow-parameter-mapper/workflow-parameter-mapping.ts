import type { WorkflowParameterMapping, WorkflowParameterSafetyLevel } from "./workflow-parameter-types";
import { buildDefaultWorkflowParameters } from "./workflow-parameter";
import { buildWorkflowParameterGroup } from "./workflow-parameter-group";
import { buildWorkflowParameterPreset } from "./workflow-parameter-preset";
import { buildWorkflowParameterSafety } from "./workflow-parameter-safety";

export function buildWorkflowParameterMapping(input: Partial<WorkflowParameterMapping> = {}): WorkflowParameterMapping {
  const parameters = input.parameters ?? buildDefaultWorkflowParameters();
  const groups =
    input.groups ??
    parameters.map((parameter) =>
      buildWorkflowParameterGroup({
        id: `workflow-parameter-group-${parameter.id}`,
        group: parameter.group,
        explanation: `${parameter.group} becomes a labeled choice instead of a hidden node value.`,
        parameterIds: [parameter.id],
      })
    );
  const levels: WorkflowParameterSafetyLevel[] = ["safe editable", "review before edit", "advanced only", "blocked for first run", "unknown"];
  const safety =
    input.safety ??
    levels.map((level, index) =>
      buildWorkflowParameterSafety({
        id: `workflow-parameter-safety-${index + 1}`,
        level,
        explanation: `${level} tells the user how carefully to handle that setting.`,
      })
    );

  return {
    id: input.id ?? "workflow-parameter-mapping",
    parameters,
    groups,
    safety,
    preset: input.preset ?? buildWorkflowParameterPreset(),
    workflowMutationAllowed: false,
  };
}
