import type { ComfyUiWorkflowAssetReference } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowAssetReference(input: Partial<ComfyUiWorkflowAssetReference> = {}): ComfyUiWorkflowAssetReference {
  return {
    id: input.id ?? "comfyui-asset-reference-checkpoint",
    assetKind: input.assetKind ?? "checkpoint",
    reference: input.reference ?? "local model name to confirm later",
    downloadAllowed: false,
    status: input.status ?? "planned",
  };
}
