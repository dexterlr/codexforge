import type {
  BlenderLightItem,
  BlenderLightingPlan,
  BlenderLightType,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

export function buildBlenderLightItem(input: {
  label: string;
  lightType: BlenderLightType;
  index?: number;
  sceneId?: string;
  purpose?: string;
}): BlenderLightItem {
  const index = input.index ?? 0;
  return {
    lightId: buildBlenderAdapterStableId("blender-light", [
      input.sceneId ?? "scene",
      input.label,
      String(index),
    ]),
    label: input.label,
    lightType: input.lightType,
    intensityHint: index === 0 ? "strong key" : index === 1 ? "soft fill" : "rim accent",
    locationHint: index === 0 ? "-3, -4, 5" : index === 1 ? "3, 2, 3" : "0, 4, 4",
    colorTemperatureHint: input.lightType === "dramatic" ? "warm key / cool rim" : "neutral daylight",
    purpose: input.purpose ?? "shape preview lighting without render execution",
    shadowNote: input.lightType === "technical-flat" ? "minimal shadow" : "soft shadow placeholder",
  };
}

export function buildBlenderLightingPlan(model: BlenderSceneModel): BlenderLightingPlan {
  const labels =
    model.lightingSetup === "environment-only"
      ? ["world environment light"]
      : ["key light", "fill light", "rim light"];
  const items = labels.map((label, index) =>
    buildBlenderLightItem({
      label,
      lightType: model.lightingSetup,
      index,
      sceneId: model.sceneId,
    })
  );

  return {
    planId: buildBlenderAdapterStableId("blender-lighting-plan", [model.sceneId]),
    sourceSceneId: model.sceneId,
    setup: model.lightingSetup,
    items,
    summary: summarizeBlenderLightingPlan({ planId: "pending", sourceSceneId: model.sceneId, setup: model.lightingSetup, items, summary: [] }),
  };
}

export function summarizeBlenderLightingPlan(plan: BlenderLightingPlan): string[] {
  return [
    `${plan.setup} lighting setup with ${plan.items.length} planned light entries.`,
    "Lighting plan supports studio-three-point, cinematic-key-fill-rim, soft-product, dramatic, environment-only, and technical-flat.",
  ];
}
