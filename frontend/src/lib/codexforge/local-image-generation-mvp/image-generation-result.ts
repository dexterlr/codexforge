import type { ImageGenerationRequest, ImageGenerationResult } from "./local-image-generation-types";

export function buildImageGenerationResult(
  request: ImageGenerationRequest,
  input: Partial<ImageGenerationResult> = {}
): ImageGenerationResult {
  return {
    id: input.id ?? `${request.id}-result`,
    status: input.status ?? "not-generated",
    suppliedArtifactLabel: input.suppliedArtifactLabel ?? "No image artifact supplied yet",
    captureMode: input.captureMode ?? "blocked",
    reviewNote: input.reviewNote ?? "Capture supplied result allowed as review-only data after a manual or approved-boundary output exists.",
  };
}
