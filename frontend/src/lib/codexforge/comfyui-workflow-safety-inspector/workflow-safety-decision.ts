import type { WorkflowSafetyDecision } from "./comfyui-workflow-safety-types";

export function buildWorkflowSafetyDecision(input: Partial<WorkflowSafetyDecision> = {}): WorkflowSafetyDecision {
  return {
    id: input.id ?? "workflow-safety-decision",
    status: input.status ?? "needs-review",
    label: input.label ?? "Needs review before parameter mapping",
    explanation: input.explanation ?? "The workflow can be previewed, but unknown nodes, assets, resources, and output paths should be checked before a future render.",
    approvalRequired: true,
  };
}
