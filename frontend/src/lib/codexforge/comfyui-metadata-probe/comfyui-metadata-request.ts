import type { ComfyUiMetadataRequest, ComfyUiMetadataTarget } from "./comfyui-metadata-probe-types";

export function buildComfyUiMetadataRequest(target: ComfyUiMetadataTarget): ComfyUiMetadataRequest {
  return {
    id: "comfyui-metadata-request",
    target,
    allowedChecks: [
      "base URL status",
      "local-only status",
      "server reachable supplied/unknown",
      "version supplied/unknown",
      "system stats supplied/unknown",
      "queue stats supplied/unknown",
      "node list supplied/unknown",
      "model list supplied/unknown",
    ],
    promptPayloadAllowed: false,
    workflowSubmissionAllowed: false,
    queueMutationAllowed: false,
    fileWriteAllowed: false,
  };
}
