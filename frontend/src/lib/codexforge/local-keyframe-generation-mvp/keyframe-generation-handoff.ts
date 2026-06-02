import type {
  KeyframeGenerationHandoff,
  KeyframeGenerationReadiness,
  KeyframeGenerationRequest,
  KeyframeGenerationResult,
} from "./local-keyframe-generation-types";

export function buildKeyframeGenerationHandoff(
  request: KeyframeGenerationRequest,
  readiness: KeyframeGenerationReadiness,
  result: KeyframeGenerationResult
): KeyframeGenerationHandoff {
  return {
    id: `${request.id}-handoff`,
    copyLabel: "Copy keyframe request allowed",
    requestHandoff: `Keyframe request ${request.id}: ${request.selectedShots.length} selected still frames from ${request.keyframePlanId}.`,
    resultHandoff: `Keyframe result ${result.status}: ${result.suppliedKeyframeLabels.join("; ")}.`,
    nextStep:
      readiness.status === "blocked-no-executor"
        ? "Generation is request ready but blocked until a future approved executor exists."
        : readiness.nextStep,
  };
}
