import type {
  UnrealAssetItem,
  UnrealAssetPlan,
  UnrealAssetType,
  UnrealLevelModel,
  UnrealProjectInput,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

function inferAssetType(label: string): UnrealAssetType {
  const normalized = label.toLowerCase();
  if (normalized.includes("skeletal")) return "skeletal-mesh";
  if (normalized.includes("mesh") || normalized.includes("kit")) return "static-mesh";
  if (normalized.includes("material")) return "material";
  if (normalized.includes("texture")) return "texture";
  if (normalized.includes("blueprint")) return "blueprint";
  if (normalized.includes("sequence") || normalized.includes("sequencer")) return "level-sequence";
  if (normalized.includes("niagara")) return "niagara-system";
  if (normalized.includes("sound") || normalized.includes("audio")) return "sound";
  if (normalized.includes("widget") || normalized.includes("ui")) return "ui-widget";
  return "unknown";
}

export function buildUnrealAssetItem(input: {
  label: string;
  index?: number;
  levelId?: string;
  assetType?: UnrealAssetType;
  required?: boolean;
}): UnrealAssetItem {
  const index = input.index ?? 0;
  const assetType = input.assetType ?? inferAssetType(input.label);
  return {
    assetId: buildUnrealAdapterStableId("unreal-asset", [
      input.levelId ?? "level",
      input.label,
      String(index),
    ]),
    label: input.label,
    assetType,
    sourceHint: "Operator-reviewed source asset or Marketplace/user-owned placeholder.",
    placeholderPath: `/Game/CodexForgePreview/Placeholders/${assetType}_${index + 1}`,
    required: input.required ?? index < 2,
    importRequirementNote: "No real asset import in Phase 65; import requirement is review text only.",
    licenseUserResponsibilityNote:
      "Operator is responsible for asset license, provenance, and usage rights before any future executor.",
    missingAssetRisk:
      assetType === "unknown" ? "Unknown asset type requires manual review." : "Missing asset keeps preview request blocked.",
    reviewAction: "Confirm source, license, placeholder path, and future artifact capture plan.",
  };
}

export function buildUnrealAssetPlan(input: UnrealProjectInput, model: UnrealLevelModel): UnrealAssetPlan {
  const labels = input.assetHints.length > 0 ? input.assetHints : ["static mesh placeholder", "level sequence placeholder"];
  const items = labels.map((label, index) =>
    buildUnrealAssetItem({ label, index, levelId: model.levelId })
  );

  return {
    planId: buildUnrealAdapterStableId("unreal-asset-plan", [model.levelId]),
    sourceLevelId: model.levelId,
    items,
    summary: summarizeUnrealAssetPlan({ planId: "pending", sourceLevelId: model.levelId, items, summary: [] }),
  };
}

export function summarizeUnrealAssetPlan(plan: UnrealAssetPlan): string[] {
  return [
    `${plan.items.length} asset placeholders planned.`,
    "Asset plan supports static-mesh, skeletal-mesh, material, texture, blueprint, level-sequence, Niagara, sound, UI widget, and unknown.",
    "No real asset import and no filesystem writes are performed.",
  ];
}
