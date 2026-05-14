import type {
  CodexForgeCapabilityId,
  CodexForgeCreativeProductionPlan,
  CodexForgeCreativeProductionStage,
  CodexForgeCreativeRenderQueueItem,
} from "./capability-types";

const creativeLabels: Partial<Record<CodexForgeCapabilityId, string>> = {
  "blender-production": "Blender production",
  "comfyui-production": "ComfyUI production",
  "unreal-production": "Unreal production",
};

function assertCreativeCapability(capabilityId: CodexForgeCapabilityId): void {
  if (!creativeLabels[capabilityId]) {
    throw new Error(`Capability is not a creative production capability: ${capabilityId}`);
  }
}

export function buildCreativeProductionStage(
  id: string,
  label: string,
  status: CodexForgeCreativeProductionStage["status"],
  summary: string,
  artifacts: string[]
): CodexForgeCreativeProductionStage {
  return { id, label, status, summary, artifacts };
}

export function buildCreativeRenderQueuePreview(
  capabilityId: CodexForgeCapabilityId
): CodexForgeCreativeRenderQueueItem[] {
  assertCreativeCapability(capabilityId);

  return [
    {
      id: `${capabilityId}:render-preview:001`,
      label: "Preview frame",
      capabilityId,
      executionMode: "local-safe-simulated",
      status: "queued-preview",
      outputPathPlaceholder: `artifacts/codexforge/${capabilityId}/preview-frame-001.png`,
      safetyNote: "Render job is local-safe/simulated; no Blender, ComfyUI, Unreal, or external renderer is launched.",
    },
    {
      id: `${capabilityId}:approval-render:final`,
      label: "Final render candidate",
      capabilityId,
      executionMode: "approval-gated-preview",
      status: "blocked-until-approval",
      outputPathPlaceholder: `artifacts/codexforge/${capabilityId}/final-render-preview.mp4`,
      safetyNote: "Creative production says approval required before execution.",
    },
  ];
}

export function buildCreativeProductionPlan(
  capabilityId: CodexForgeCapabilityId
): CodexForgeCreativeProductionPlan {
  assertCreativeCapability(capabilityId);
  const label = creativeLabels[capabilityId] ?? "Creative production";
  const isBlender = capabilityId === "blender-production";
  const isComfy = capabilityId === "comfyui-production";

  const stages = [
    buildCreativeProductionStage(
      "goal",
      "Production goal",
      "preview",
      "Capture the operator goal, constraints, references, and expected deliverables.",
      ["goal brief"]
    ),
    buildCreativeProductionStage(
      "plan",
      isBlender ? "Scene plan" : isComfy ? "Workflow plan" : "Level plan",
      "planned",
      "Prepare assets, scene/workflow/level structure, naming, and review checkpoints.",
      isBlender ? ["scene outline", "material notes"] : isComfy ? ["node graph outline", "seed policy"] : ["level outline", "sequence notes"]
    ),
    buildCreativeProductionStage(
      "queue",
      "Render queue preview",
      "simulated",
      "Preview local-safe render queue entries without launching creative applications.",
      ["render queue preview"]
    ),
    buildCreativeProductionStage(
      "approval",
      "Approval boundary",
      "approval-required",
      "Approval required before execution; future adapter handoff remains guarded.",
      ["approval checklist", "artifact ledger preview"]
    ),
  ];

  const plan = {
    id: `${capabilityId}:creative-production-plan`,
    capabilityId,
    label,
    productionGoalPlaceholder: "Operator defines the production goal before any future adapter action.",
    assetPlan: [
      "Source assets are listed before use.",
      "Generated asset names are deterministic.",
      "Outputs remain placeholders until approved execution exists.",
    ],
    sceneWorkflowLevelPlan: [
      isBlender ? "Scene collection, camera, lights, materials, and render settings preview." : "",
      isComfy ? "Workflow nodes, model references, prompt slots, seed policy, and output slots preview." : "",
      capabilityId === "unreal-production" ? "Level map, actors, materials, cinematic sequence, and packaging gates preview." : "",
    ].filter(Boolean),
    stages,
    approvalBoundary: "Creative production says approval required before execution.",
    artifactOutputPreview: [
      `artifacts/codexforge/${capabilityId}/plan.md`,
      `artifacts/codexforge/${capabilityId}/review-preview.json`,
    ],
    renderQueuePreview: buildCreativeRenderQueuePreview(capabilityId),
    summary: "",
  };

  return {
    ...plan,
    summary: summarizeCreativeProductionPlan(plan),
  };
}

export function summarizeCreativeProductionPlan(
  plan: Omit<CodexForgeCreativeProductionPlan, "summary"> | CodexForgeCreativeProductionPlan
): string {
  return `${plan.label}: ${plan.stages.length} preview stages, ${plan.renderQueuePreview.length} render queue item(s), approval required before execution.`;
}
