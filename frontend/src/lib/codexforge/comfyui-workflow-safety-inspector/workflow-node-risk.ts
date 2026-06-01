import type { WorkflowNodeRisk } from "./comfyui-workflow-safety-types";

export function buildWorkflowNodeRisk(input: Partial<WorkflowNodeRisk> = {}): WorkflowNodeRisk {
  return {
    id: input.id ?? "workflow-node-risk-custom",
    nodeType: input.nodeType ?? "unknown custom node",
    riskLabel: input.riskLabel ?? "Review before use",
    plainEnglish: input.plainEnglish ?? "The node may be fine, but a beginner should know what it does before the workflow continues.",
  };
}
