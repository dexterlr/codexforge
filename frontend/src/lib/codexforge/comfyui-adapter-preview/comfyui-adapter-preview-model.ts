import type { ComfyUiAdapterPreviewModel, ComfyUiWorkflowNode } from "./comfyui-adapter-types";

function buildNode(
  id: string,
  label: string,
  kind: ComfyUiWorkflowNode["kind"],
  detail: string
): ComfyUiWorkflowNode {
  return { id, label, kind, detail };
}

export function buildComfyUiAdapterPreviewModel(): ComfyUiAdapterPreviewModel {
  const nodes = [
    buildNode("node:positive-prompt", "Positive prompt slot", "prompt", "Operator-reviewed prompt text placeholder for the selected storyboard frame."),
    buildNode("node:negative-prompt", "Negative prompt slot", "prompt", "Safety and artifact-exclusion prompt placeholder; no hidden mutation instructions."),
    buildNode("node:model-checkpoint", "Checkpoint placeholder", "model", "Model reference is selected only after review; no model download or provider call."),
    buildNode("node:sampler", "Sampler settings placeholder", "sampler", "Steps, cfg, scheduler, and denoise are visible planning fields only."),
    buildNode("node:conditioning", "Reference conditioning", "conditioning", "Approved source image placeholders and storyboard notes are review context only."),
    buildNode("node:output", "Output placeholder", "output", "Preview output path names are placeholders; no files are written from UI."),
  ];
  const outputPlaceholders = [
    "concept_frame_001.png",
    "style_reference_grid.png",
    "comfyui_workflow.preview.json",
  ];
  const approvalPacket = [
    "Operator confirms prompt text, model placeholder, seed policy, and output naming.",
    "ComfyUI endpoint remains uncalled from the UI.",
    "Future executor must require explicit approval before any workflow run.",
  ];
  const safetyBoundaries = [
    "preview-only",
    "approval required",
    "no ComfyUI execution",
    "no endpoint call",
    "no file writes",
    "preserve latest-message authority",
  ];

  return {
    id: "comfyui-adapter-preview:v1",
    workflowName: "ComfyUI Adapter Preview v1",
    summary: {
      nodeCount: nodes.length,
      promptNodeCount: nodes.filter((node) => node.kind === "prompt").length,
      outputCount: outputPlaceholders.length,
      approvalRequired: true,
      executionStatus: "blocked",
    },
    nodes,
    seedPolicy: "Fixed operator-provided seed placeholder; no random seed generation in planning.",
    modelPolicy: "Model, LoRA, and checkpoint choices stay review-only until a guarded executor exists.",
    outputPlaceholders,
    approvalPacket,
    safetyBoundaries,
    handoff: [
      "ComfyUI Adapter Preview handoff",
      "Review prompt nodes, model placeholders, sampler settings, seed policy, and output names.",
      "Preview-only: no ComfyUI execution, no endpoint call, no command execution, no file writes.",
      "Approval required before any future guarded workflow executor request.",
      "Preserve latest-message authority.",
    ].join("\n"),
  };
}

export function summarizeComfyUiAdapterPreview(model: ComfyUiAdapterPreviewModel): string[] {
  return [
    `${model.workflowName}: ${model.summary.nodeCount} workflow node preview(s).`,
    `${model.summary.promptNodeCount} prompt node(s), ${model.summary.outputCount} output placeholder(s).`,
    "Execution status blocked; approval required for any future executor boundary.",
  ];
}

