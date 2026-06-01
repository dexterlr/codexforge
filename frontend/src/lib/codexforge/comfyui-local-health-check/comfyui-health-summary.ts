import type { ComfyUiHealthSummary } from "./comfyui-health-types";
import { buildComfyUiHealthPlan } from "./comfyui-health-plan";
import { buildComfyUiHealthResult } from "./comfyui-health-result";
import { buildComfyUiHealthSafety } from "./comfyui-health-safety";
import { buildDefaultComfyUiHealthTarget } from "./comfyui-health-target";

export function summarizeComfyUiHealth(summary: ComfyUiHealthSummary): string {
  return `${summary.target.name} health is preview-only at ${summary.target.expectedBaseUrl}; no workflow run, no prompt sent, no cloud credits spent.`;
}

export function buildComfyUiHealthSummary(): ComfyUiHealthSummary {
  const target = buildDefaultComfyUiHealthTarget();
  const summary: ComfyUiHealthSummary = {
    target,
    plan: buildComfyUiHealthPlan(target),
    safety: buildComfyUiHealthSafety(),
    result: buildComfyUiHealthResult(),
    summary: "",
    nextAction: "After manual setup, review video workflows before preparing a video job.",
  };
  return { ...summary, summary: summarizeComfyUiHealth(summary) };
}
