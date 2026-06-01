import type { ComfyUiJobParameterSet } from "./comfyui-job-package-types";

export function buildComfyUiJobParameterSet(input: Partial<ComfyUiJobParameterSet> = {}): ComfyUiJobParameterSet {
  return {
    id: input.id ?? "comfyui-job-parameter-set-first-safe-draft",
    label: input.label ?? "First safe draft parameters",
    parameters: input.parameters ?? ["prompt", "negative prompt", "seed", "small resolution", "short duration", "batch count one"],
    safeForFirstPackage: input.safeForFirstPackage ?? true,
  };
}
