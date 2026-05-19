import type {
  BlenderRenderEnginePreference,
  BlenderRenderSettings,
  BlenderSceneInput,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

function chooseEngine(input: BlenderSceneInput): BlenderRenderEnginePreference {
  const text = `${input.renderIntent} ${input.sceneGoal}`.toLowerCase();
  if (text.includes("cycles")) return "cycles";
  if (text.includes("workbench") || input.sceneKind === "technical-diagram") return "workbench";
  if (text.includes("preview")) return "preview";
  return "eevee-next";
}

export function buildBlenderRenderSettings(
  input: BlenderSceneInput,
  model: BlenderSceneModel
): BlenderRenderSettings {
  return {
    settingsId: buildBlenderAdapterStableId("blender-render-settings", [model.sceneId]),
    sourceSceneId: model.sceneId,
    enginePreference: chooseEngine(input),
    resolutionLabel: input.sceneKind === "product-shot" ? "square 1600 preview label" : "hd 1920x1080 label",
    frameRange: input.animationHints.length > 0 ? "1-120 placeholder" : "single frame placeholder",
    fps: 24,
    sampleHint: "low preview samples; no render execution",
    outputArtifactPlaceholder: "blender-python-preview and blender-scene-plan only",
    transparentBackground: input.sceneKind === "product-shot",
    riskNotes: [
      "eevee-next, cycles, workbench, and preview are settings labels only.",
      "No render execution is performed.",
    ],
  };
}

export function summarizeBlenderRenderSettings(settings: BlenderRenderSettings): string[] {
  return [
    `Render settings prefer ${settings.enginePreference}.`,
    `${settings.resolutionLabel}; ${settings.frameRange}; ${settings.fps} fps.`,
    "Render settings are preview-only and do not trigger rendering.",
  ];
}
