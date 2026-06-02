import type { ComfyUiMetadataSummary } from "./comfyui-metadata-probe-types";
import { buildComfyUiMetadataHandoff } from "./comfyui-metadata-handoff";
import { buildComfyUiMetadataRequest } from "./comfyui-metadata-request";
import { buildComfyUiMetadataResult } from "./comfyui-metadata-result";
import { buildComfyUiMetadataSafety } from "./comfyui-metadata-safety";
import { buildDefaultComfyUiMetadataTarget } from "./comfyui-metadata-target";

export function summarizeComfyUiMetadataProbe(summary: ComfyUiMetadataSummary): string {
  return `ComfyUI metadata is ${summary.result.resultSource} with ${summary.result.localOnlyStatus} target status; no prompt was sent, no workflow was submitted, and no queue changed.`;
}

export function buildComfyUiMetadataSummary(): ComfyUiMetadataSummary {
  const target = buildDefaultComfyUiMetadataTarget();
  const summary: ComfyUiMetadataSummary = {
    target,
    request: buildComfyUiMetadataRequest(target),
    result: buildComfyUiMetadataResult(target),
    safety: buildComfyUiMetadataSafety(),
    handoff: buildComfyUiMetadataHandoff(),
    summary: "",
  };
  return { ...summary, summary: summarizeComfyUiMetadataProbe(summary) };
}
