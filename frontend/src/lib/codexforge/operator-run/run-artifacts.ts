import type { OperatorRunArtifactPreview, OperatorRunArtifactType, OperatorRunInput } from "./run-types";
import { buildOperatorRunReactKey } from "./run-types";

function artifactTypeForTool(toolName: string): OperatorRunArtifactType {
  if (toolName.includes("blender")) return "blender-script-preview";
  if (toolName.includes("comfyui")) return "comfyui-workflow-preview";
  if (toolName.includes("unreal")) return "unreal-command-preview";
  if (toolName.includes("render")) return "render-queue-manifest";
  if (toolName.includes("research")) return "research-summary";
  if (toolName.includes("diff")) return "patch-preview";
  return "generic-output-placeholder";
}

export function buildRunArtifactPreview(runId: string, type: OperatorRunArtifactType, label?: string): OperatorRunArtifactPreview {
  return {
    id: buildOperatorRunReactKey(runId, "artifact", type, label ?? "primary"),
    type,
    label: label ?? type.replace(/-/g, " "),
    summary: "Preview ledger entry only; no files are written and no external tools are executed.",
    previewOnly: true,
  };
}

export function buildRunArtifactLedger(input: OperatorRunInput, runId: string): OperatorRunArtifactPreview[] {
  const toolName = (input.toolName ?? input.adapter?.toolName ?? "render-job").toLowerCase();
  const primary = artifactTypeForTool(toolName);
  return [
    buildRunArtifactPreview(runId, primary, "Primary run artifact preview"),
    buildRunArtifactPreview(runId, "generic-output-placeholder", "Future execution output placeholder"),
  ];
}

export function summarizeRunArtifacts(artifacts: OperatorRunArtifactPreview[]): string {
  return `${artifacts.length} artifact previews recorded in a no-write ledger.`;
}
