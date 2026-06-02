import type { ComfyUiJobPackageHandoff } from "./comfyui-job-package-types";

export function buildComfyUiJobPackageHandoff(input: Partial<ComfyUiJobPackageHandoff> = {}): ComfyUiJobPackageHandoff {
  return {
    id: input.id ?? "comfyui-job-package-handoff",
    copyLabel: input.copyLabel ?? "Copy package handoff allowed",
    nextStep: input.nextStep ?? "Next: review the workflow dry run and ComfyUI submit boundary before any future approved submit.",
    safetyNote: input.safetyNote ?? "This package is reviewable text and local planning only. It does not call ComfyUI.",
  };
}
