import type {
  BlenderLightType,
  BlenderRiskLevel,
  BlenderSceneInput,
  BlenderSceneLayer,
  BlenderSceneLayerKind,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

const LAYERS: BlenderSceneLayerKind[] = [
  "world",
  "environment",
  "subject",
  "props",
  "lighting",
  "camera",
  "animation",
  "render",
  "annotations",
];

function chooseLightingSetup(input: BlenderSceneInput): BlenderLightType {
  const hints = input.lightingHints.join(" ").toLowerCase();
  if (hints.includes("dramatic")) return "dramatic";
  if (hints.includes("cinematic")) return "cinematic-key-fill-rim";
  if (hints.includes("environment")) return "environment-only";
  if (hints.includes("technical")) return "technical-flat";
  if (input.sceneKind === "product-shot") return "soft-product";
  return "studio-three-point";
}

function chooseRisk(input: BlenderSceneInput): BlenderRiskLevel {
  return input.objectHints.some((hint) => hint.toLowerCase().includes("imported"))
    ? "high"
    : "medium";
}

export function buildBlenderSceneLayer(
  layer: BlenderSceneLayerKind,
  sourceSceneInputId = "blender-scene-input"
): BlenderSceneLayer {
  return {
    layerId: buildBlenderAdapterStableId("blender-layer", [sourceSceneInputId, layer]),
    layer,
    label: `${layer.replace("-", " ")} layer`,
    purpose: `Preview-only ${layer} planning for Blender scene model.`,
    previewNotes: [
      "Layer is descriptive only.",
      "No scene file, render, or Python execution is produced from the UI.",
    ],
  };
}

export function buildBlenderSceneModel(input: BlenderSceneInput): BlenderSceneModel {
  const sceneId = buildBlenderAdapterStableId("blender-scene", [
    input.sceneInputId,
    input.sceneGoal,
  ]);

  return {
    sceneId,
    sceneKind: input.sceneKind,
    coordinateSystemNotes: [
      "Blender uses Z-up coordinates.",
      "Locations are hints for script preview readability, not measured layout authority.",
    ],
    layers: LAYERS.map((layer) => buildBlenderSceneLayer(layer, input.sceneInputId)),
    objectGroups: ["subject primitives", "environment primitives", "asset placeholders"],
    materialGroups: input.materialHints,
    lightingSetup: chooseLightingSetup(input),
    cameraSetup: input.cameraHints.join("; "),
    animationBeats: input.animationHints,
    renderSettingsSummary: ["preview render settings only", "render execution blocked"],
    expectedArtifacts: ["blender-python-preview", "blender-scene-plan", "future executor packet"],
    riskLevel: chooseRisk(input),
    approvalRequired: true,
    previewOnlyPosture:
      "Preview-only posture: review the generated script text and packet before any future guarded executor is considered.",
  };
}

export function summarizeBlenderSceneModel(model: BlenderSceneModel): string[] {
  return [
    `${model.layers.length} scene layers modeled for ${model.sceneKind}.`,
    `Lighting setup ${model.lightingSetup}; risk ${model.riskLevel}.`,
    model.previewOnlyPosture,
  ];
}
