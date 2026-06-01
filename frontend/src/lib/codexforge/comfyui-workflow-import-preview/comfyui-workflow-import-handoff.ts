import type { ComfyUiWorkflowImportHandoff } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowImportHandoff(input: Partial<ComfyUiWorkflowImportHandoff> = {}): ComfyUiWorkflowImportHandoff {
  return {
    id: input.id ?? "comfyui-workflow-import-handoff",
    copyLabel: input.copyLabel ?? "Copy import handoff allowed",
    nextStep: input.nextStep ?? "Next: inspect workflow safety before mapping parameters.",
    safetyNote: input.safetyNote ?? "The handoff contains a summary only. It does not include a render command or provider payload.",
  };
}
