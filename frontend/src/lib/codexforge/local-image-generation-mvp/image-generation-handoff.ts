import type {
  ImageGenerationHandoff,
  ImageGenerationReadiness,
  ImageGenerationRequest,
  ImageGenerationResult,
} from "./local-image-generation-types";

export function buildImageGenerationHandoff(
  request: ImageGenerationRequest,
  readiness: ImageGenerationReadiness,
  result: ImageGenerationResult
): ImageGenerationHandoff {
  return {
    id: `${request.id}-handoff`,
    copyLabel: "Copy image request allowed",
    requestHandoff: `Image request ${request.id}: ${readiness.status}; ${request.workflowPackage}; destination ${request.artifactDestination}.`,
    resultHandoff: `Image result ${result.status}: ${result.suppliedArtifactLabel}. Supplied metadata is review-only until an approved artifact flow persists it.`,
    nextStep:
      readiness.status === "blocked-no-executor"
        ? "Generation is request ready but blocked until a future approved executor exists."
        : readiness.nextStep,
  };
}
