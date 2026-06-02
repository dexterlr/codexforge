import type { ImageGenerationPrompt, ImageGenerationRequest } from "./local-image-generation-types";

export function buildImageGenerationPrompt(
  request: ImageGenerationRequest
): ImageGenerationPrompt {
  return {
    id: `${request.id}-prompt`,
    positive: request.prompt,
    negative: request.negativePrompt,
    styleGuide: `${request.style}; target ${request.sizeTarget}.`,
    copyLabel: "Copy image request allowed",
  };
}
