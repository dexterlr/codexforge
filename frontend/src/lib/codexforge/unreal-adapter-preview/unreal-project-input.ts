import type {
  UnrealProjectInput,
  UnrealProjectInputValidation,
  UnrealProjectKind,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

type UnrealProjectInputArgs = Partial<Omit<UnrealProjectInput, "projectInputId">> & {
  projectInputId?: string;
};

const DEFAULT_GOAL =
  "Cinematic-preview Unreal level with a hero environment, planned actors, placeholder assets, blueprint notes, Sequencer camera beats, and packaging warnings.";

const PROJECT_KIND_KEYWORDS: Array<[UnrealProjectKind, string[]]> = [
  ["cinematic-preview", ["cinematic", "sequencer", "film", "camera"]],
  ["playable-level-preview", ["playable", "gameplay", "level"]],
  ["architectural-visualization", ["architecture", "architectural", "interior"]],
  ["product-showcase", ["product", "showcase", "hero product"]],
  ["virtual-production", ["virtual production", "stage", "led volume"]],
  ["technical-demo", ["technical", "demo", "mechanic"]],
  ["environment-blockout", ["blockout", "environment", "terrain"]],
  ["interaction-prototype", ["interaction", "prototype", "trigger"]],
];

function listOrDefault(value: string[] | undefined, fallback: string[]): string[] {
  return value && value.length > 0 ? value : fallback;
}

function inferProjectKind(goal: string, fallback?: UnrealProjectKind): UnrealProjectKind {
  const normalized = goal.toLowerCase();
  return (
    PROJECT_KIND_KEYWORDS.find(([, keywords]) =>
      keywords.some((keyword) => normalized.includes(keyword))
    )?.[0] ?? fallback ?? "unknown"
  );
}

export function buildUnrealProjectInput(input: UnrealProjectInputArgs = {}): UnrealProjectInput {
  const sourceCreativePlanId = input.sourceCreativePlanId ?? "creative-plan-unreal-preview";
  const projectGoal = input.projectGoal ?? DEFAULT_GOAL;
  const projectKind = input.projectKind ?? inferProjectKind(projectGoal, "cinematic-preview");

  return {
    projectInputId:
      input.projectInputId ??
      buildUnrealAdapterStableId("unreal-project-input", [projectGoal, sourceCreativePlanId]),
    sourceCreativePlanId,
    projectGoal,
    projectKind,
    levelIntent: input.levelIntent ?? "reviewable cinematic level model with world, lighting, camera, and packaging layers",
    cinematicIntent: input.cinematicIntent ?? "Sequencer shot plan with cine-camera-actor placeholders and no render execution",
    targetPlatformLabel: input.targetPlatformLabel ?? "Windows editor preview",
    visualStyle: input.visualStyle ?? "premium cinematic sci-fi environment with restrained production lighting",
    worldEnvironmentHints: listOrDefault(input.worldEnvironmentHints, [
      "night city overlook",
      "hero plaza blockout",
      "volumetric fog placeholder",
    ]),
    actorHints: listOrDefault(input.actorHints, [
      "hero static mesh platform",
      "cine camera hero shot",
      "directional moon light",
      "blueprint trigger placeholder",
    ]),
    assetHints: listOrDefault(input.assetHints, [
      "static mesh city kit placeholder",
      "level sequence cinematic pass",
      "blueprint interaction shell",
    ]),
    materialHints: listOrDefault(input.materialHints, [
      "wet asphalt material instance",
      "brushed metal trim",
      "soft emissive signage",
    ]),
    blueprintHints: listOrDefault(input.blueprintHints, [
      "actor-blueprint reveal trigger",
      "level-blueprint camera cue review",
    ]),
    sequencerCameraHints: listOrDefault(input.sequencerCameraHints, [
      "establishing crane shot",
      "push-in on hero platform",
      "cutaway to skyline",
    ]),
    packagingBuildConstraints: listOrDefault(input.packagingBuildConstraints, [
      "no package/build",
      "no render execution",
      "output paths are placeholders only",
    ]),
    operatorConstraints: listOrDefault(input.operatorConstraints, [
      "preview-only",
      "no Unreal execution",
      "no Unreal Editor launch",
      "no render execution",
      "no package/build",
      "no file writes",
      "future executor boundary",
      "preserve latest-message authority",
    ]),
    noExecutionGuarantee:
      input.noExecutionGuarantee ??
      "Phase 65 generates deterministic Unreal adapter previews only; it does not launch Unreal, run editor commands, execute Python or Blueprint automation, render, package, build, write files, or call providers.",
  };
}

export function validateUnrealProjectInput(input: UnrealProjectInput): UnrealProjectInputValidation {
  const guarantee = input.noExecutionGuarantee.toLowerCase();
  const constraints = input.operatorConstraints.join(" ").toLowerCase();
  const blockedReasons = [
    guarantee.includes("does not launch unreal") ? null : "No-execution guarantee must block Unreal launch.",
    constraints.includes("no file writes") ? null : "Operator constraints must block file writes.",
    constraints.includes("no package/build") ? null : "Operator constraints must block package/build.",
  ].filter((item): item is string => !!item);

  return {
    valid: blockedReasons.length === 0,
    blockedReasons,
    warnings: [
      input.projectKind === "unknown" ? "Project kind is unknown; adapter uses generic Unreal placeholders." : null,
      "Cinematic and Blueprint hints are planning text only; no Unreal automation is executed.",
    ].filter((item): item is string => !!item),
  };
}

export function summarizeUnrealProjectInput(input: UnrealProjectInput): string[] {
  return [
    `Project input ${input.projectInputId} maps creative plan ${input.sourceCreativePlanId}.`,
    `Project kind ${input.projectKind}; target platform label ${input.targetPlatformLabel}.`,
    `Constraints: ${input.operatorConstraints.join(", ")}.`,
  ];
}
