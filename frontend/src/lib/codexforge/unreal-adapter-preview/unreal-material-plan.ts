import type {
  UnrealLevelModel,
  UnrealMaterialItem,
  UnrealMaterialPlan,
  UnrealProjectInput,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

export function buildUnrealMaterialItem(input: {
  label: string;
  index?: number;
  levelId?: string;
}): UnrealMaterialItem {
  const index = input.index ?? 0;
  const normalized = input.label.toLowerCase();
  return {
    materialId: buildUnrealAdapterStableId("unreal-material", [
      input.levelId ?? "level",
      input.label,
      String(index),
    ]),
    label: input.label,
    baseColorLabel: normalized.includes("emissive")
      ? "cool cyan emissive"
      : normalized.includes("metal")
        ? "dark brushed metal"
        : "neutral cinematic surface",
    roughnessHint: normalized.includes("wet") ? "low roughness reflective surface" : "medium roughness",
    metallicHint: normalized.includes("metal") ? "metallic enabled" : "non-metallic",
    emissiveHint: normalized.includes("emissive") ? "soft emissive channel placeholder" : "emissive disabled",
    texturePlaceholders: [
      `/Game/CodexForgePreview/Textures/T_${index + 1}_BaseColor`,
      `/Game/CodexForgePreview/Textures/T_${index + 1}_Normal`,
    ],
    materialInstanceNote: "Material instance placeholder only; no .uasset is created.",
    usageNotes: "Review material intent, texture placeholders, and actor assignments before any future executor.",
  };
}

export function buildUnrealMaterialPlan(input: UnrealProjectInput, model: UnrealLevelModel): UnrealMaterialPlan {
  const labels = input.materialHints.length > 0 ? input.materialHints : ["neutral material placeholder"];
  const items = labels.map((label, index) =>
    buildUnrealMaterialItem({ label, index, levelId: model.levelId })
  );

  return {
    planId: buildUnrealAdapterStableId("unreal-material-plan", [model.levelId]),
    sourceLevelId: model.levelId,
    items,
    summary: summarizeUnrealMaterialPlan({ planId: "pending", sourceLevelId: model.levelId, items, summary: [] }),
  };
}

export function summarizeUnrealMaterialPlan(plan: UnrealMaterialPlan): string[] {
  return [
    `${plan.items.length} material placeholders planned.`,
    "Material plan uses texture placeholders and material instance notes only; no asset file is written.",
  ];
}
