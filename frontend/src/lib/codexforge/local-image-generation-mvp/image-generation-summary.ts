import type { ImageGenerationSummary } from "./local-image-generation-types";
import { buildDefaultImageGenerationRequest } from "./image-generation-request";
import { buildImageGenerationHandoff } from "./image-generation-handoff";
import { buildImageGenerationPrompt } from "./image-generation-prompt";
import { buildImageGenerationReadiness } from "./image-generation-readiness";
import { buildImageGenerationResult } from "./image-generation-result";
import { buildImageGenerationSafety } from "./image-generation-safety";

export function buildImageGenerationSummary(): ImageGenerationSummary {
  const request = buildDefaultImageGenerationRequest();
  const prompt = buildImageGenerationPrompt(request);
  const result = buildImageGenerationResult(request);
  const readiness = buildImageGenerationReadiness(request, result);
  const safety = buildImageGenerationSafety(request);
  const handoff = buildImageGenerationHandoff(request, readiness, result);

  return {
    request,
    prompt,
    readiness,
    safety,
    result,
    handoff,
    summary: summarizeLocalImageGeneration({ request, prompt, readiness, safety, result, handoff, summary: "" }),
  };
}

export function summarizeLocalImageGeneration(summary: ImageGenerationSummary): string {
  return `Local image MVP is ${summary.readiness.status}: request prepared, no auto-generation, and result capture stays supplied/manual or approved-boundary only.`;
}
