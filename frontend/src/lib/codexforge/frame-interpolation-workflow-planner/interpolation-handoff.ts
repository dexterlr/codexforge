import type { InterpolationHandoff } from "./frame-interpolation-types";

export function buildInterpolationHandoff(input: Partial<InterpolationHandoff> = {}): InterpolationHandoff {
  return {
    id: input.id ?? "interpolation-handoff",
    copyLabel: input.copyLabel ?? "Copy interpolation plan allowed",
    nextStep: input.nextStep ?? "Next: send the reviewed motion decision into video finishing before any final export handoff.",
    safetyNote:
      input.safetyNote ??
      "The copied plan is for future approved execution only. No interpolation, provider call, or ComfyUI workflow is started here.",
  };
}
