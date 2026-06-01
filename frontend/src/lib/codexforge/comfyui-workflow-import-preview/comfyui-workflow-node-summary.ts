import type { ComfyUiWorkflowNodeSummary } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowNodeSummary(input: Partial<ComfyUiWorkflowNodeSummary> = {}): ComfyUiWorkflowNodeSummary {
  return {
    id: input.id ?? "comfyui-node-summary-loader",
    nodeKind: input.nodeKind ?? "model loader",
    plainEnglish: input.plainEnglish ?? "This node chooses a local model or checkpoint. It is not loaded during preview.",
    safeToShow: input.safeToShow ?? true,
  };
}
