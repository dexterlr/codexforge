import type { FinishingHandoff } from "./video-finishing-types";

export function buildFinishingHandoff(input: Partial<FinishingHandoff> = {}): FinishingHandoff {
  return {
    id: input.id ?? "finishing-handoff",
    copyLabel: input.copyLabel ?? "Copy finishing checklist allowed",
    nextStep: input.nextStep ?? "Next: review draft-to-final readiness before any future final render is approved.",
    safetyNote:
      input.safetyNote ??
      "The checklist is copy-only. There is no render button, no export button, no ComfyUI call, and no provider call.",
  };
}
