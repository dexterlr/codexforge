import type { BlenderScenePlan, CreativeBrief } from "./creative-types";

export function summarizeBlenderScenePlan(plan: BlenderScenePlan): string {
  return `Blender scene preview: ${plan.sceneObjects.length} object group(s), ${plan.animationBeats.length} animation beat(s), adapter ${plan.adapter}, approval required.`;
}

export function buildBlenderScenePlan(brief: CreativeBrief): BlenderScenePlan {
  const plan = {
    id: "blender-scene-plan:phase-7",
    adapter: "blender-python",
    approvalRequired: true,
    sceneObjects: [
      "CodexForge studio console mesh placeholder",
      "Storyboard wall panels as named collections",
      "Render queue status plinths",
      "Safe Patch Preview approval boundary arch",
    ],
    materials: [
      "brushed graphite console material",
      "cyan emissive lane markers",
      "amber approval boundary material",
      "matte glass artifact preview tiles",
    ],
    lighting: [
      "large softbox key light",
      "low cyan rim lights",
      "warm boundary accent light",
    ],
    camera: [
      "35mm establishing camera",
      "70mm approval-boundary close camera",
      "fixed storyboard board camera",
    ],
    animationBeats: [
      `brief title reveal: ${brief.title}`,
      "storyboard cards stage in sequence",
      "render queue items pulse as preview-only",
      "approval boundary locks before future execution",
    ],
    geometryNodeHints: [
      "procedural card rail layout from shot count",
      "deterministic artifact tile naming",
      "non-destructive preview labels",
    ],
    renderSettingsPreview: [
      "engine placeholder: Cycles or Eevee after approval",
      "resolution placeholder: 1920x1080 preview",
      "frame range placeholder: storyboard duration estimate",
      "output path placeholder only",
    ],
    summary: "",
  } satisfies BlenderScenePlan;

  return { ...plan, summary: summarizeBlenderScenePlan(plan) };
}
