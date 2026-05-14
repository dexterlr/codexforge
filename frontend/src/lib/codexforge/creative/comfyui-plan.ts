import type { ComfyUIWorkflowPlan, CreativeBrief, Storyboard } from "./creative-types";

export function summarizeComfyUIWorkflowPlan(plan: ComfyUIWorkflowPlan): string {
  return `ComfyUI workflow preview: ${plan.promptNodes.length} prompt node(s), ${plan.outputAssets.length} output placeholder(s), adapter ${plan.adapter}, approval required.`;
}

export function buildComfyUIWorkflowPlan(brief: CreativeBrief, storyboard: Storyboard): ComfyUIWorkflowPlan {
  const plan = {
    id: "comfyui-workflow-plan:phase-7",
    adapter: "comfyui-workflow-run",
    approvalRequired: true,
    promptNodes: [
      `positive prompt slot: ${brief.style}`,
      "negative prompt slot: unsafe execution, hidden mutation, unexpected file writes",
      `shot prompt fan-out: ${storyboard.shots.length} storyboard prompt hint(s)`,
      "review caption prompt slot for artifact gallery labels",
    ],
    modelCheckpointPlaceholder: "checkpoint placeholder selected only after approval",
    samplerPlaceholder: "sampler placeholder with visible steps, cfg, and scheduler fields",
    seedPolicy: "fixed operator-provided seed placeholder; no random seed generation in planning",
    inputAssets: [
      "reference board placeholder",
      "storyboard prompt hints",
      "operator-approved source image placeholders",
    ],
    outputAssets: [
      "concept_frame_001.png placeholder",
      "style_reference_grid.png placeholder",
      "artifact_gallery_contact_sheet.png placeholder",
    ],
    workflowRisks: [
      "Model choice and input assets require operator review.",
      "ComfyUI run remains blocked until explicit approval.",
      "Outputs are placeholders; no workflow JSON is written by this planner.",
    ],
    summary: "",
  } satisfies ComfyUIWorkflowPlan;

  return { ...plan, summary: summarizeComfyUIWorkflowPlan(plan) };
}
