import type { DraftToFinalHandoff } from "./draft-to-final-types";

export function buildDraftToFinalHandoff(input: Partial<DraftToFinalHandoff> = {}): DraftToFinalHandoff {
  return {
    id: input.id ?? "draft-to-final-handoff",
    copyLabel: input.copyLabel ?? "Copy final render handoff allowed",
    nextStep: input.nextStep ?? "Next: wait for future approved execution before any real final render can start.",
    safetyNote:
      input.safetyNote ??
      "There is no final render button, no ComfyUI call, no cloud provider call, no upscale execution, and no frame interpolation execution.",
  };
}
