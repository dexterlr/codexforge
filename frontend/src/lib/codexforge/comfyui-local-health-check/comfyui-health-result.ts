import type { ComfyUiHealthResult } from "./comfyui-health-types";

export function buildComfyUiHealthResult(): ComfyUiHealthResult {
  return {
    id: "comfyui-health-preview-result",
    status: "preview-only",
    meaning: "This screen explains what a safe ComfyUI health check would verify. It does not contact ComfyUI yet.",
  };
}
