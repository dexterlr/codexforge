import type {
  UnrealBlueprintItem,
  UnrealBlueprintPlan,
  UnrealBlueprintType,
  UnrealLevelModel,
  UnrealProjectInput,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

function inferBlueprintType(label: string): UnrealBlueprintType {
  const normalized = label.toLowerCase();
  if (normalized.includes("level")) return "level-blueprint";
  if (normalized.includes("widget") || normalized.includes("ui")) return "widget-blueprint";
  if (normalized.includes("animation")) return "animation-blueprint";
  if (normalized.includes("interface")) return "blueprint-interface";
  if (normalized.includes("function")) return "function-library";
  if (normalized.includes("actor") || normalized.includes("trigger")) return "actor-blueprint";
  return "unknown";
}

export function buildUnrealBlueprintItem(input: {
  label: string;
  index?: number;
  levelId?: string;
  blueprintType?: UnrealBlueprintType;
}): UnrealBlueprintItem {
  const index = input.index ?? 0;
  const blueprintType = input.blueprintType ?? inferBlueprintType(input.label);
  return {
    blueprintId: buildUnrealAdapterStableId("unreal-blueprint", [
      input.levelId ?? "level",
      input.label,
      String(index),
    ]),
    label: input.label,
    blueprintType,
    purpose: "Preview intended interaction, cue, or scene system without generating Blueprint assets.",
    actorTarget: index === 0 ? "hero static mesh platform" : "supporting actor placeholder",
    eventGraphSummary:
      "Event graph summary is planning prose only: BeginPlay, reviewed input, and visible output actions are placeholders.",
    inputEvents: ["BeginPlay placeholder", "operator-approved trigger placeholder"],
    outputActions: ["set visibility placeholder", "play Sequencer cue placeholder"],
    variables: ["bReviewedByOperator", "TargetActorReference", "SequenceReference"],
    safetyNote: "No Blueprint execution, compilation, asset generation, or editor automation in Phase 65.",
    implementationComplexity: blueprintType === "level-blueprint" ? "medium" : "low",
  };
}

export function buildUnrealBlueprintPlan(input: UnrealProjectInput, model: UnrealLevelModel): UnrealBlueprintPlan {
  const labels = input.blueprintHints.length > 0 ? input.blueprintHints : ["actor-blueprint placeholder"];
  const items = labels.map((label, index) =>
    buildUnrealBlueprintItem({ label, index, levelId: model.levelId })
  );

  return {
    planId: buildUnrealAdapterStableId("unreal-blueprint-plan", [model.levelId]),
    sourceLevelId: model.levelId,
    items,
    summary: summarizeUnrealBlueprintPlan({ planId: "pending", sourceLevelId: model.levelId, items, summary: [] }),
  };
}

export function summarizeUnrealBlueprintPlan(plan: UnrealBlueprintPlan): string[] {
  return [
    `${plan.items.length} Blueprint placeholders planned.`,
    "Blueprint plan supports actor-blueprint, level-blueprint, widget-blueprint, animation-blueprint, interfaces, function libraries, and unknown.",
    "No Blueprint execution.",
  ];
}
