import type { ComfyUiHealthSafety } from "./comfyui-health-types";

export function buildComfyUiHealthSafety(): ComfyUiHealthSafety {
  return {
    id: "comfyui-health-safety",
    guarantees: ["No workflow is run.", "No prompt is sent.", "No cloud provider API calls are made.", "No API keys or secrets are collected.", "No image generation or video generation starts."],
    blocked: ["direct ComfyUI workflow execution", "arbitrary UI calls to local services", "cloud fallback without manual review", "automatic job start"],
  };
}
