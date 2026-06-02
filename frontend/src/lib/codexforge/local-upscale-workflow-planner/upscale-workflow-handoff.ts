import type { UpscaleWorkflowHandoff } from "./local-upscale-workflow-types";

export function buildUpscaleWorkflowHandoff(input: Partial<UpscaleWorkflowHandoff> = {}): UpscaleWorkflowHandoff {
  return {
    id: input.id ?? "upscale-workflow-handoff",
    copyLabel: input.copyLabel ?? "Copy upscale plan allowed",
    nextStep: input.nextStep ?? "Next: compare the reviewed draft, then decide whether finishing also needs interpolation.",
    safetyNote:
      input.safetyNote ??
      "Copy finishing handoff allowed, but no video is changed yet and future approved execution is still required.",
  };
}
