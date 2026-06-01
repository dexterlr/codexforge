import type { WorkflowAssetRisk } from "./comfyui-workflow-safety-types";

export function buildWorkflowAssetRisk(input: Partial<WorkflowAssetRisk> = {}): WorkflowAssetRisk {
  return {
    id: input.id ?? "workflow-asset-risk-model",
    asset: input.asset ?? "checkpoint or model file",
    riskLabel: input.riskLabel ?? "Confirm locally",
    plainEnglish: input.plainEnglish ?? "The file may be needed later, but this inspector does not download or open it.",
  };
}
