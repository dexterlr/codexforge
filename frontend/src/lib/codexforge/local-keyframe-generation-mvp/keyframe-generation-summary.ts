import type { KeyframeGenerationSummary } from "./local-keyframe-generation-types";
import { buildDefaultKeyframeGenerationRequest } from "./keyframe-generation-request";
import { buildKeyframeGenerationHandoff } from "./keyframe-generation-handoff";
import { buildKeyframeGenerationPlanReview } from "./keyframe-generation-plan-review";
import { buildKeyframeGenerationReadiness } from "./keyframe-generation-readiness";
import { buildKeyframeGenerationResult } from "./keyframe-generation-result";
import { buildKeyframeGenerationSafety } from "./keyframe-generation-safety";

export function buildKeyframeGenerationSummary(): KeyframeGenerationSummary {
  const request = buildDefaultKeyframeGenerationRequest();
  const planReview = buildKeyframeGenerationPlanReview(request);
  const result = buildKeyframeGenerationResult(request);
  const readiness = buildKeyframeGenerationReadiness(request, result);
  const safety = buildKeyframeGenerationSafety(request);
  const handoff = buildKeyframeGenerationHandoff(request, readiness, result);

  return {
    request,
    planReview,
    readiness,
    safety,
    result,
    handoff,
    summary: summarizeLocalKeyframeGeneration({ request, planReview, readiness, safety, result, handoff, summary: "" }),
  };
}

export function summarizeLocalKeyframeGeneration(summary: KeyframeGenerationSummary): string {
  return `Local keyframes MVP is ${summary.readiness.status}: still-frame requests are prepared, no auto-generation occurs, and supplied keyframes can be reviewed later.`;
}
