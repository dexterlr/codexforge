import type {
  UnrealActorItem,
  UnrealActorPlan,
  UnrealActorType,
  UnrealLevelModel,
  UnrealProjectInput,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

function inferActorType(label: string): UnrealActorType {
  const normalized = label.toLowerCase();
  if (normalized.includes("cine") || normalized.includes("cinema")) return "cine-camera-actor";
  if (normalized.includes("camera")) return "camera-actor";
  if (normalized.includes("directional")) return "directional-light";
  if (normalized.includes("point light")) return "point-light";
  if (normalized.includes("sky")) return "sky-light";
  if (normalized.includes("post")) return "post-process-volume";
  if (normalized.includes("trigger")) return "trigger-volume";
  if (normalized.includes("blueprint")) return "blueprint-actor-placeholder";
  if (normalized.includes("skeletal") || normalized.includes("character")) return "skeletal-mesh-placeholder";
  if (normalized.includes("niagara") || normalized.includes("particle")) return "niagara-placeholder";
  if (normalized.includes("mesh") || normalized.includes("platform") || normalized.includes("prop")) return "static-mesh-actor";
  return "unknown";
}

export function buildUnrealActorItem(input: {
  label: string;
  index?: number;
  levelId?: string;
  actorType?: UnrealActorType;
  materialId?: string;
  blueprintSystemId?: string;
  role?: string;
}): UnrealActorItem {
  const index = input.index ?? 0;
  const actorType = input.actorType ?? inferActorType(input.label);

  return {
    actorId: buildUnrealAdapterStableId("unreal-actor", [
      input.levelId ?? "level",
      input.label,
      String(index),
    ]),
    label: input.label,
    actorType,
    role: input.role ?? (index === 0 ? "primary level subject" : "supporting level element"),
    locationHint: index === 0 ? "X=0 Y=0 Z=120" : `X=${index * 220} Y=${index % 2 === 0 ? 160 : -160} Z=80`,
    rotationHint: actorType.includes("camera") ? "Pitch=-8 Yaw=35 Roll=0" : "Pitch=0 Yaw=0 Roll=0",
    scaleHint: actorType === "trigger-volume" ? "X=2 Y=2 Z=1" : "X=1 Y=1 Z=1",
    materialId: input.materialId ?? `unreal-material-${index + 1}`,
    blueprintSystemId: input.blueprintSystemId ?? `unreal-blueprint-${index + 1}`,
    animationSequencerNote: actorType.includes("camera")
      ? "Sequencer shot camera placeholder; no render execution."
      : "Static placement or manual keyframe placeholder only.",
    riskNote:
      actorType === "blueprint-actor-placeholder"
        ? "Blueprint placeholder only; no Blueprint execution."
        : "Actor placement preview only; no level mutation.",
  };
}

export function buildUnrealActorPlan(input: UnrealProjectInput, model: UnrealLevelModel): UnrealActorPlan {
  const labels = input.actorHints.length > 0 ? input.actorHints : ["hero static mesh", "cine camera"];
  const items = labels.map((label, index) =>
    buildUnrealActorItem({
      label,
      index,
      levelId: model.levelId,
      materialId: `unreal-material-${(index % Math.max(input.materialHints.length, 1)) + 1}`,
      blueprintSystemId: `unreal-blueprint-${(index % Math.max(input.blueprintHints.length, 1)) + 1}`,
    })
  );

  return {
    planId: buildUnrealAdapterStableId("unreal-actor-plan", [model.levelId]),
    sourceLevelId: model.levelId,
    items,
    summary: summarizeUnrealActorPlan({ planId: "pending", sourceLevelId: model.levelId, items, summary: [] }),
  };
}

export function summarizeUnrealActorPlan(plan: UnrealActorPlan): string[] {
  return [
    `${plan.items.length} actor preview items planned.`,
    "Actor plan supports static-mesh-actor, cine-camera-actor, blueprint-actor-placeholder, lighting, volumes, Niagara placeholders, and unknown.",
  ];
}
