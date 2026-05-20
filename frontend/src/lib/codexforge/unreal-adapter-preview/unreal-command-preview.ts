import type {
  UnrealActorPlan,
  UnrealAssetPlan,
  UnrealBlueprintPlan,
  UnrealBuildSettings,
  UnrealCommandPreview,
  UnrealCommandSection,
  UnrealLevelModel,
  UnrealMaterialPlan,
  UnrealProjectInput,
  UnrealSequencerPlan,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

export function buildUnrealCommandSection(input: {
  sourceLevelId: string;
  label: string;
  previewText: string;
  index?: number;
}): UnrealCommandSection {
  return {
    sectionId: buildUnrealAdapterStableId("unreal-command-section", [
      input.sourceLevelId,
      input.label,
      String(input.index ?? 0),
    ]),
    label: input.label,
    previewText: input.previewText,
  };
}

export function buildUnrealCommandPreview(args: {
  projectInput: UnrealProjectInput;
  levelModel: UnrealLevelModel;
  actorPlan: UnrealActorPlan;
  assetPlan: UnrealAssetPlan;
  materialPlan: UnrealMaterialPlan;
  blueprintPlan: UnrealBlueprintPlan;
  sequencerPlan: UnrealSequencerPlan;
  buildSettings: UnrealBuildSettings;
}): UnrealCommandPreview {
  const { projectInput, levelModel, actorPlan, assetPlan, materialPlan, blueprintPlan, sequencerPlan, buildSettings } = args;
  const sections = [
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "header safety comment",
      index: 0,
      previewText: [
        "# Unreal Adapter Preview v1 - preview only.",
        "# Review command/script-like text only. Do not execute from CodexForge UI.",
        "# Unreal launch, editor command execution, Python or Blueprint automation, render, package/build, file writes, and network calls are intentionally omitted.",
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "project path placeholder",
      index: 1,
      previewText: [
        "PROJECT_PATH = <operator-reviewed-unreal-project-placeholder>",
        `PROJECT_GOAL = ${projectInput.projectGoal}`,
        "# Placeholder only; no .uproject is read or written.",
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "editor command placeholder",
      index: 2,
      previewText: [
        "# Future executor would require explicit approval before any editor launch.",
        "# Editor command intentionally omitted.",
        `# Planned level layers: ${levelModel.levelLayers.map((layer) => layer.layer).join(", ")}`,
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "python blueprint automation placeholder",
      index: 3,
      previewText: [
        "# Python/Blueprint automation placeholder.",
        `# Actors: ${actorPlan.items.map((item) => `${item.label} (${item.actorType})`).join("; ")}`,
        `# Blueprints: ${blueprintPlan.items.map((item) => `${item.label} (${item.blueprintType})`).join("; ")}`,
        "# Automation execution intentionally omitted.",
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "asset material placeholder",
      index: 4,
      previewText: [
        "# Asset and material review placeholders.",
        `# Assets: ${assetPlan.items.map((item) => `${item.label} -> ${item.placeholderPath}`).join("; ")}`,
        `# Materials: ${materialPlan.items.map((item) => item.label).join("; ")}`,
        "# Import and asset file generation intentionally omitted.",
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "sequence render placeholder",
      index: 5,
      previewText: [
        "# Sequence/render placeholder.",
        `# Sequence: ${sequencerPlan.sequenceLabel}; shots: ${sequencerPlan.shotList.length}`,
        `# Output placeholder: ${sequencerPlan.renderOutputPlaceholder}`,
        "# Render/movie queue execution intentionally omitted.",
      ].join("\n"),
    }),
    buildUnrealCommandSection({
      sourceLevelId: levelModel.levelId,
      label: "package build placeholder",
      index: 6,
      previewText: [
        "# Package/build placeholder.",
        `# Target platform label: ${buildSettings.targetPlatformLabel}`,
        `# Output artifact placeholder: ${buildSettings.outputArtifactPlaceholder}`,
        "# Package/build execution intentionally omitted.",
      ].join("\n"),
    }),
  ];
  const previewText = sections.map((section) => section.previewText).join("\n\n");

  return {
    previewId: buildUnrealAdapterStableId("unreal-command-preview", [levelModel.levelId]),
    sourceLevelId: levelModel.levelId,
    sections,
    previewText,
    safetySummary: [
      "Command preview includes preview only comment.",
      "Command preview includes project path, editor command, Python/Blueprint automation, sequence/render, and package/build placeholders.",
      "Command preview omits runnable editor commands, process helpers, network calls, file writes, render execution, and package/build execution.",
    ],
  };
}

export function summarizeUnrealCommandPreview(preview: UnrealCommandPreview): string[] {
  return [
    `${preview.sections.length} Unreal command preview sections generated.`,
    "Preview text is copyable for review only; Unreal execution is blocked in Phase 65.",
  ];
}
