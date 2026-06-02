import type {
  KeyframeGenerationRequest,
  KeyframeGenerationResult,
} from "./local-keyframe-generation-types";

export function buildKeyframeGenerationResult(
  request: KeyframeGenerationRequest,
  input: Partial<KeyframeGenerationResult> = {}
): KeyframeGenerationResult {
  return {
    id: input.id ?? `${request.id}-result`,
    status: input.status ?? "not-generated",
    suppliedKeyframeLabels: input.suppliedKeyframeLabels ?? ["No keyframes supplied yet"],
    captureMode: input.captureMode ?? "blocked",
    reviewNote: input.reviewNote ?? "Capture supplied keyframes allowed after manual supply or an approved-boundary result.",
  };
}
