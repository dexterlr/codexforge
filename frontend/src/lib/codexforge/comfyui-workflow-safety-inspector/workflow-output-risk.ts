import type { WorkflowOutputRisk } from "./comfyui-workflow-safety-types";

export function buildWorkflowOutputRisk(input: Partial<WorkflowOutputRisk> = {}): WorkflowOutputRisk {
  return {
    id: input.id ?? "workflow-output-risk-path",
    destination: input.destination ?? "artifact destination",
    riskLabel: input.riskLabel ?? "Needs planned folder",
    plainEnglish: input.plainEnglish ?? "Future outputs should land in a known review area, not an unknown or risky path.",
  };
}
