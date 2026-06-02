import type { ImageGenerationRequest, ImageGenerationSafety } from "./local-image-generation-types";

export function buildImageGenerationSafety(request: ImageGenerationRequest): ImageGenerationSafety {
  return {
    id: `${request.id}-safety`,
    localOnly: true,
    noCloudSpend: true,
    noComfyUiCall: true,
    noAutoRun: true,
    noSecrets: true,
    approvalRequired: true,
    plainEnglish:
      "This MVP prepares a local image request only. It does not call ComfyUI, send prompts to providers, spend cloud credits, or hide a running job.",
  };
}
