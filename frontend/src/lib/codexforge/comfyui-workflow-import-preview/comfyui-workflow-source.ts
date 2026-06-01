import type { ComfyUiWorkflowSource, ComfyUiWorkflowSourceType } from "./comfyui-workflow-import-types";

export function buildComfyUiWorkflowSource(input: Partial<ComfyUiWorkflowSource> = {}): ComfyUiWorkflowSource {
  return {
    id: input.id ?? "comfyui-workflow-source-template",
    type: input.type ?? "template-workflow",
    label: input.label ?? "Template workflow note",
    plainEnglish:
      input.plainEnglish ??
      "A ComfyUI workflow is a saved recipe of connected nodes. Importing means previewing that recipe before it can be mapped or packaged.",
    rawJsonPreview: input.rawJsonPreview,
    importAllowed: false,
  };
}

export function buildDefaultComfyUiWorkflowSources(): ComfyUiWorkflowSource[] {
  const sourceTypes: ComfyUiWorkflowSourceType[] = [
    "pasted-json-preview",
    "file-reference-preview",
    "manual-workflow-note",
    "template-workflow",
    "future-import",
  ];

  return sourceTypes.map((type, index) =>
    buildComfyUiWorkflowSource({
      id: `comfyui-workflow-source-${index + 1}`,
      type,
      label: type.replace(/-/g, " "),
      plainEnglish: `This source is treated as ${type.replace(/-/g, " ")} metadata only. Nothing runs and no file is parsed automatically.`,
    })
  );
}
