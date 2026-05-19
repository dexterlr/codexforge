import type {
  BlenderMaterialItem,
  BlenderMaterialPlan,
  BlenderSceneInput,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

export function buildBlenderMaterialItem(input: {
  label: string;
  index?: number;
  sceneId?: string;
}): BlenderMaterialItem {
  const index = input.index ?? 0;
  const normalized = input.label.toLowerCase();

  return {
    materialId: `mat-${index + 1}`,
    label: input.label,
    baseColorLabel: normalized.includes("metal")
      ? "cool grey metal"
      : normalized.includes("emissive")
        ? "soft cyan emission"
        : "matte neutral",
    roughnessHint: normalized.includes("gloss") ? "low roughness" : "medium-high roughness",
    metallicHint: normalized.includes("metal") ? "metallic accent" : "non-metallic",
    emissionHint: normalized.includes("emissive") ? "low emission placeholder" : "none",
    transparencyHint: normalized.includes("glass") ? "transparent placeholder" : "opaque",
    texturePlaceholder: buildBlenderAdapterStableId("texture-placeholder", [
      input.sceneId ?? "scene",
      input.label,
    ]),
    usageNotes: "Material values are readable script hints, not exact color rendering requirements.",
  };
}

export function buildBlenderMaterialPlan(
  input: BlenderSceneInput,
  model: BlenderSceneModel
): BlenderMaterialPlan {
  const labels = input.materialHints.length > 0 ? input.materialHints : ["matte neutral"];
  const items = labels.map((label, index) =>
    buildBlenderMaterialItem({ label, index, sceneId: model.sceneId })
  );

  return {
    planId: buildBlenderAdapterStableId("blender-material-plan", [model.sceneId]),
    sourceSceneId: model.sceneId,
    items,
    summary: summarizeBlenderMaterialPlan({ planId: "pending", sourceSceneId: model.sceneId, items, summary: [] }),
  };
}

export function summarizeBlenderMaterialPlan(plan: BlenderMaterialPlan): string[] {
  return [
    `${plan.items.length} material preview items planned.`,
    "Materials use labels and simple hints only; exact rendering is intentionally not required.",
  ];
}
