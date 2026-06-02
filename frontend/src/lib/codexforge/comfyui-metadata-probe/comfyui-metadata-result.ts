import type { ComfyUiMetadataResult, ComfyUiMetadataTarget } from "./comfyui-metadata-probe-types";

export function buildComfyUiMetadataResult(target: ComfyUiMetadataTarget): ComfyUiMetadataResult {
  return {
    id: "comfyui-metadata-result",
    baseUrlStatus: target.baseUrl.trim() ? (target.localOnly ? "supplied-local-preview" : "blocked-nonlocal") : "missing",
    localOnlyStatus: target.baseUrl.trim() ? (target.localOnly ? "local-only" : "not-local") : "unknown",
    serverReachable: "unknown",
    version: "unknown",
    systemStats: "unknown",
    queueStats: "unknown",
    nodeList: "unknown",
    modelList: "unknown",
    noPromptSent: true,
    noWorkflowSubmitted: true,
    noQueueMutation: true,
    resultSource: "preview",
  };
}
