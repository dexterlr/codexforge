import type { ComfyUiJobInput } from "./comfyui-job-package-types";

export function buildComfyUiJobInput(input: Partial<ComfyUiJobInput> = {}): ComfyUiJobInput {
  return {
    id: input.id ?? "comfyui-job-input-prompt",
    label: input.label ?? "Prompt",
    source: input.source ?? "Video prompt builder handoff",
    ready: input.ready ?? true,
  };
}
