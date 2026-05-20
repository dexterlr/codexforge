import type {
  UnrealLevelLayer,
  UnrealLevelLayerKind,
  UnrealLevelModel,
  UnrealProjectInput,
  UnrealRiskLevel,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

const LEVEL_LAYERS: UnrealLevelLayerKind[] = [
  "world",
  "terrain",
  "architecture",
  "props",
  "characters",
  "lighting",
  "cameras",
  "sequencer",
  "gameplay",
  "ui",
  "post-process",
  "packaging",
];

function chooseRisk(input: UnrealProjectInput): UnrealRiskLevel {
  const combined = [...input.assetHints, ...input.blueprintHints, ...input.packagingBuildConstraints]
    .join(" ")
    .toLowerCase();
  if (combined.includes("package") || combined.includes("build")) return "high";
  if (combined.includes("blueprint") || combined.includes("sequence")) return "medium";
  return "low";
}

export function buildUnrealLevelLayer(
  layer: UnrealLevelLayerKind,
  sourceProjectInputId = "unreal-project-input"
): UnrealLevelLayer {
  return {
    layerId: buildUnrealAdapterStableId("unreal-level-layer", [sourceProjectInputId, layer]),
    layer,
    label: `${layer.replace("-", " ")} layer`,
    purpose: `Preview-only ${layer} planning for Unreal level model.`,
    previewNotes: [
      "Layer is descriptive and typed.",
      "No .uproject, .umap, .uasset, render, package, build, or editor command is produced from UI.",
    ],
  };
}

export function buildUnrealLevelModel(input: UnrealProjectInput): UnrealLevelModel {
  const levelId = buildUnrealAdapterStableId("unreal-level", [
    input.projectInputId,
    input.projectGoal,
  ]);

  return {
    levelId,
    projectKind: input.projectKind,
    worldNotes: input.worldEnvironmentHints,
    levelLayers: LEVEL_LAYERS.map((layer) => buildUnrealLevelLayer(layer, input.projectInputId)),
    actorGroups: ["environment actors", "lighting actors", "camera actors", "blueprint placeholders"],
    assetGroups: input.assetHints,
    materialGroups: input.materialHints,
    blueprintSystems: input.blueprintHints,
    sequencerCameraSetup: input.sequencerCameraHints,
    buildPackageNotes: input.packagingBuildConstraints,
    expectedArtifacts: [
      "unreal-level-plan",
      "unreal-command-preview",
      "unreal-sequence",
      "future executor packet",
    ],
    riskLevel: chooseRisk(input),
    approvalRequired: true,
    previewOnlyPosture:
      "Preview-only posture: review the typed level model, command preview, and future executor packet before any guarded Unreal executor is considered.",
  };
}

export function summarizeUnrealLevelModel(model: UnrealLevelModel): string[] {
  return [
    `${model.levelLayers.length} level layers modeled for ${model.projectKind}.`,
    `${model.actorGroups.length} actor groups, ${model.assetGroups.length} asset groups, and ${model.blueprintSystems.length} blueprint systems planned.`,
    `Risk ${model.riskLevel}; approval required: ${model.approvalRequired ? "yes" : "no"}.`,
    model.previewOnlyPosture,
  ];
}
