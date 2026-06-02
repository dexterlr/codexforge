import type {
  KeyframeGenerationPlanReview,
  KeyframeGenerationRequest,
} from "./local-keyframe-generation-types";

export function buildKeyframeGenerationPlanReview(
  request: KeyframeGenerationRequest
): KeyframeGenerationPlanReview {
  return {
    id: `${request.id}-plan-review`,
    planId: request.keyframePlanId,
    selectedShotCount: request.selectedShots.length,
    plainEnglish: "Keyframes are still frames. They guide a future video draft but do not render motion by themselves.",
    nextStep: "Review selected shots, prompt set, consistency notes, workflow package, and artifact destination.",
  };
}
