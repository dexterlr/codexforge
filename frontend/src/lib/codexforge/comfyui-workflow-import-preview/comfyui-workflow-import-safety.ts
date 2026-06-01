import type { ComfyUiWorkflowImportSafety } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowImportSafety(input: Partial<ComfyUiWorkflowImportSafety> = {}): ComfyUiWorkflowImportSafety {
  return {
    id: input.id ?? "comfyui-workflow-import-safety",
    label: input.label ?? "Preview only",
    safeSummaryByDefault: true,
    workflowExecutionAllowed: false,
    comfyUiApiCallAllowed: false,
    automaticAssetDownloadAllowed: false,
    promptSendAllowed: false,
    rawJsonSecondary: true,
  };
}
