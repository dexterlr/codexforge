import type { ComfyUiWorkflowImportSummary } from "./comfyui-workflow-import-types";
import { buildComfyUiWorkflowAssetReference } from "./comfyui-workflow-asset-reference";
import { buildComfyUiWorkflowImportHandoff } from "./comfyui-workflow-import-handoff";
import { buildComfyUiWorkflowImportPlan } from "./comfyui-workflow-import-plan";
import { buildComfyUiWorkflowImportSafety } from "./comfyui-workflow-import-safety";
import { buildComfyUiWorkflowNodeSummary } from "./comfyui-workflow-node-summary";
import { buildDefaultComfyUiWorkflowSources } from "./comfyui-workflow-source";

export function buildComfyUiWorkflowImportSummary(): ComfyUiWorkflowImportSummary {
  const sources = buildDefaultComfyUiWorkflowSources();
  const plan = buildComfyUiWorkflowImportPlan({ sourceId: sources[0]?.id ?? "comfyui-workflow-source-1" });
  const nodes = [
    buildComfyUiWorkflowNodeSummary({
      id: "comfyui-node-summary-prompt",
      nodeKind: "prompt text",
      plainEnglish: "This node holds the words that guide a future render. It is only shown for review.",
    }),
    buildComfyUiWorkflowNodeSummary({
      id: "comfyui-node-summary-sampler",
      nodeKind: "sampler settings",
      plainEnglish: "This node controls steps and sampling style. It should be mapped into safer choices later.",
    }),
    buildComfyUiWorkflowNodeSummary({
      id: "comfyui-node-summary-output",
      nodeKind: "output destination",
      plainEnglish: "This node names where a future artifact may go. The path is not touched during preview.",
    }),
  ];
  const assets = [
    buildComfyUiWorkflowAssetReference({
      id: "comfyui-asset-checkpoint",
      assetKind: "checkpoint",
      reference: "model file expected locally",
      status: "unknown",
    }),
    buildComfyUiWorkflowAssetReference({
      id: "comfyui-asset-lora",
      assetKind: "LoRA or style",
      reference: "optional style reference to confirm",
      status: "planned",
    }),
  ];
  const safety = buildComfyUiWorkflowImportSafety();
  const handoff = buildComfyUiWorkflowImportHandoff();

  return {
    sources,
    plan,
    nodes,
    assets,
    safety,
    handoff,
    summary: summarizeComfyUiWorkflowImport({ sources, plan, nodes, assets, safety, handoff, summary: "" }),
  };
}

export function summarizeComfyUiWorkflowImport(summary: ComfyUiWorkflowImportSummary): string {
  return `${summary.sources.length} workflow source previews, ${summary.nodes.length} node summaries, ${summary.assets.length} asset references, preview only.`;
}
