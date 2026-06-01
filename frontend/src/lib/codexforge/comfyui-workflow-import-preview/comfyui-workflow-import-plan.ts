import type { ComfyUiWorkflowImportPlan } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowImportPlan(input: Partial<ComfyUiWorkflowImportPlan> = {}): ComfyUiWorkflowImportPlan {
  return {
    id: input.id ?? "comfyui-workflow-import-plan",
    sourceId: input.sourceId ?? "comfyui-workflow-source-template",
    steps:
      input.steps ?? [
        "Name the workflow source.",
        "Show only a safe summary first.",
        "List visible node types and expected assets.",
        "Keep raw JSON in advanced details.",
        "Send the workflow to safety inspection before parameters are mapped.",
      ],
    previewOnly: true,
  };
}
