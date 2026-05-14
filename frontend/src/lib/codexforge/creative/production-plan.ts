import type { CreativeBrief, CreativeProductionPlan, CreativeProductionStage, CreativeProductionStageId, CreativePreviewStatus } from "./creative-types";

export function buildCreativeProductionStage(
  id: CreativeProductionStageId,
  label: string,
  status: CreativePreviewStatus,
  summary: string,
  outputs: string[],
  approvalGate = "approval required before execution"
): CreativeProductionStage {
  return { id, label, status, summary, outputs, approvalGate };
}

export function selectNextCreativeProductionAction(plan: CreativeProductionPlan): string {
  const next = plan.stages.find((stage) => stage.status === "preview-only" || stage.status === "planned");
  return next ? `Review ${next.label} and keep the handoff inside Safe Patch Preview.` : plan.safeNextAction;
}

export function summarizeCreativeProductionPlan(plan: CreativeProductionPlan): string {
  return `${plan.goal}: ${plan.stages.length} preview stages, ${plan.adapters.length} guarded adapter placeholder(s), ${plan.expectedArtifacts.length} expected artifact preview(s), no execution.`;
}

export function buildCreativeProductionPlan(brief: CreativeBrief): CreativeProductionPlan {
  const stages = [
    buildCreativeProductionStage("brief", "Creative brief", "preview-only", "Capture goal, medium, audience, style, references, and constraints.", ["brief summary"]),
    buildCreativeProductionStage("storyboard", "Storyboard", "planned", "Break the production into reviewable shots with prompt hints and safety notes.", ["storyboard markdown preview"]),
    buildCreativeProductionStage("asset-plan", "Asset plan", "planned", "List source assets, generated placeholders, review checkpoints, and deterministic naming.", ["asset checklist"]),
    buildCreativeProductionStage("scene-workflow-level-plan", "Scene, workflow, level plan", "planned", "Prepare Blender, ComfyUI, and Unreal preview plans without launching those applications.", ["Blender script preview", "ComfyUI workflow preview", "Unreal command preview"]),
    buildCreativeProductionStage("render-queue-preview", "Render queue preview", "preview-only", "Show local-safe simulated render-job entries without render execution.", ["render queue manifest preview"]),
    buildCreativeProductionStage("patch-preview-handoff", "Safe Patch Preview handoff", "approval-required", "Package future artifact previews as prompts for Safe Patch Preview.", ["patch preview prompt"]),
    buildCreativeProductionStage("approval-boundary", "Approval boundary", "approval-required", "Require explicit operator approval before any external app, render, or file mutation.", ["approval checklist"]),
    buildCreativeProductionStage("future-guarded-adapter", "Future guarded adapter", "blocked-until-approval", "Execution remains out of scope for this studio preview.", ["guarded adapter placeholder"]),
  ];

  const plan = {
    id: "creative-production-plan:phase-7",
    goal: brief.prompt,
    medium: brief.medium,
    stages,
    risks: [
      "Creative app control is high impact and requires explicit approval.",
      "Render output paths are placeholders only.",
      "Patch handoff must remain preview-only until Safe Patch Preview approval.",
    ],
    assets: [
      "Reference board placeholder",
      "Storyboard markdown preview",
      "Scene/workflow/level plan placeholders",
      "Artifact ledger update preview",
    ],
    adapters: [
      "blender-python",
      "comfyui-workflow-run",
      "unreal-editor-command",
      "local-safe-render-job",
      "safe-patch-preview",
    ],
    approvalGates: [
      "approval required before execution",
      "no render execution in Phase 7",
      "Safe Patch Preview approval boundary before any future artifact materialization",
    ],
    expectedArtifacts: [
      "storyboard.md preview",
      "blender_scene.py preview",
      "comfyui_workflow.json preview",
      "unreal_editor_command.txt preview",
      "render_queue_manifest.json preview",
      "artifact_ledger_update.md preview",
    ],
    safeNextAction: "Review the Safe Patch Preview handoff prompt; do not execute adapters from the studio.",
    summary: "",
  } satisfies CreativeProductionPlan;

  return {
    ...plan,
    safeNextAction: selectNextCreativeProductionAction(plan),
    summary: summarizeCreativeProductionPlan(plan),
  };
}
