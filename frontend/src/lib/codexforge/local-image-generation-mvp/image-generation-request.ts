import type { ImageGenerationRequest } from "./local-image-generation-types";

export function buildImageGenerationRequest(
  input: Partial<ImageGenerationRequest> = {}
): ImageGenerationRequest {
  return {
    id: input.id ?? "local-image-request-001",
    prompt: input.prompt ?? "A clean product concept image for a local creative draft.",
    negativePrompt: input.negativePrompt ?? "No text, no watermark, no unsafe content, no cloud provider.",
    style: input.style ?? "clear cinematic still, practical lighting, review-friendly detail",
    sizeTarget: input.sizeTarget ?? "1024x1024 draft target",
    localProvider: input.localProvider ?? "ComfyUI local provider, not called from this page",
    workflowPackage: input.workflowPackage ?? "reviewed-image-workflow-package",
    artifactDestination: input.artifactDestination ?? "safe local artifact workspace, supplied later",
    approvalStatus: input.approvalStatus ?? "request-reviewed",
    executionPosture: input.executionPosture ?? "blocked-until-approved-executor",
    noAutoRunGuarantee: true,
  };
}

export function buildDefaultImageGenerationRequest(): ImageGenerationRequest {
  return buildImageGenerationRequest();
}
