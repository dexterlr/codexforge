import type {
  UnrealBuildSettings,
  UnrealLevelModel,
  UnrealProjectInput,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

export function buildUnrealBuildSettings(
  input: UnrealProjectInput,
  model: UnrealLevelModel
): UnrealBuildSettings {
  return {
    settingsId: buildUnrealAdapterStableId("unreal-build-settings", [
      model.levelId,
      input.targetPlatformLabel,
    ]),
    sourceLevelId: model.levelId,
    targetPlatformLabel: input.targetPlatformLabel,
    editorVersionPlaceholder: "Unreal Editor version placeholder; operator confirms locally.",
    renderingPathHint: "Lumen/Nanite review label only; no render or build execution.",
    qualityPreset: "cinematic preview quality label",
    resolutionLabel: "1920x1080 preview label",
    frameRange: "001-180 placeholder",
    fps: 24,
    packageBuildIntent: "No package/build in Phase 65; packaging intent is warning text only.",
    outputArtifactPlaceholder: "artifacts/codexforge/unreal/build-output-placeholder",
    riskNotes: [
      "Package/build blocked in Phase 65.",
      "Render/movie queue blocked in Phase 65.",
      "Output artifact path is a placeholder; no file writes.",
    ],
    validationRecommendations: [
      "Confirm target platform label before any future executor.",
      "Review expected artifacts and capture plan.",
      "Require explicit approval before build or package is ever available.",
    ],
  };
}

export function summarizeUnrealBuildSettings(settings: UnrealBuildSettings): string[] {
  return [
    `Target platform label: ${settings.targetPlatformLabel}.`,
    `${settings.qualityPreset}; ${settings.resolutionLabel}; ${settings.frameRange}; ${settings.fps} fps.`,
    settings.packageBuildIntent,
  ];
}
