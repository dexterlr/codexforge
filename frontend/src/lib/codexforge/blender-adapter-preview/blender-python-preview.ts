import type {
  BlenderCameraPlan,
  BlenderLightingPlan,
  BlenderMaterialPlan,
  BlenderObjectPlan,
  BlenderPythonPreview,
  BlenderPythonSection,
  BlenderRenderSettings,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

export function buildBlenderPythonSection(input: {
  sourceSceneId: string;
  label: string;
  scriptText: string;
  index?: number;
}): BlenderPythonSection {
  return {
    sectionId: buildBlenderAdapterStableId("blender-python-section", [
      input.sourceSceneId,
      input.label,
      String(input.index ?? 0),
    ]),
    label: input.label,
    scriptText: input.scriptText,
  };
}

function safeName(value: string): string {
  const cleaned = value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return cleaned.length > 0 ? cleaned : "item";
}

export function buildBlenderPythonPreview(args: {
  sceneModel: BlenderSceneModel;
  objectPlan: BlenderObjectPlan;
  materialPlan: BlenderMaterialPlan;
  lightingPlan: BlenderLightingPlan;
  cameraPlan: BlenderCameraPlan;
  renderSettings: BlenderRenderSettings;
}): BlenderPythonPreview {
  const { sceneModel, objectPlan, materialPlan, lightingPlan, cameraPlan, renderSettings } = args;
  const sections = [
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "header safety comment",
      index: 0,
      scriptText: [
        "# Blender Adapter Preview v1 - preview only.",
        "# Review script text only. Do not execute from CodexForge UI.",
        "# Save, render, file write, network, and external process actions are intentionally omitted.",
        "import bpy",
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "clear scene",
      index: 1,
      scriptText: [
        "# clear scene preview",
        "bpy.ops.object.select_all(action='SELECT')",
        "bpy.ops.object.delete()",
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "create materials",
      index: 2,
      scriptText: [
        "# create materials",
        ...materialPlan.items.flatMap((material) => {
          const name = safeName(material.label);
          return [
            `${name}_mat = bpy.data.materials.new(name='${material.label}')`,
            `${name}_mat.use_nodes = True`,
            `# ${material.baseColorLabel}; ${material.roughnessHint}; ${material.metallicHint}; ${material.emissionHint}`,
          ];
        }),
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "create objects",
      index: 3,
      scriptText: [
        "# create objects",
        ...objectPlan.items.map((item) => {
          const primitive =
            item.objectType === "sphere"
              ? "primitive_uv_sphere_add"
              : item.objectType === "cylinder"
                ? "primitive_cylinder_add"
                : item.objectType === "plane"
                  ? "primitive_plane_add"
                  : "primitive_cube_add";
          return [
            `# ${item.label} (${item.objectType}) - ${item.riskNote}`,
            `bpy.ops.mesh.${primitive}(location=(${item.locationHint}))`,
            `bpy.context.object.name = '${item.label}'`,
          ].join("\n");
        }),
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "create lights",
      index: 4,
      scriptText: [
        "# create lights",
        ...lightingPlan.items.map((light) =>
          [
            `bpy.ops.object.light_add(type='AREA', location=(${light.locationHint}))`,
            `bpy.context.object.name = '${light.label}'`,
            `# ${light.intensityHint}; ${light.colorTemperatureHint}; ${light.shadowNote}`,
          ].join("\n")
        ),
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "create camera",
      index: 5,
      scriptText: [
        "# create camera",
        ...cameraPlan.shots.slice(0, 1).map((shot) =>
          [
            `bpy.ops.object.camera_add(location=(${shot.cameraLocationHint}))`,
            `bpy.context.scene.camera = bpy.context.object`,
            `bpy.context.object.name = '${shot.label}'`,
            `# Target: ${shot.targetHint}; focal length: ${shot.focalLengthHint}; framing: ${shot.framing}`,
          ].join("\n")
        ),
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "configure render settings",
      index: 6,
      scriptText: [
        "# configure render settings",
        `# Engine preference label: ${renderSettings.enginePreference}`,
        `# Resolution label: ${renderSettings.resolutionLabel}`,
        `# Frame range: ${renderSettings.frameRange}; fps: ${renderSettings.fps}`,
        `# Transparent background: ${renderSettings.transparentBackground ? "yes" : "no"}`,
      ].join("\n"),
    }),
    buildBlenderPythonSection({
      sourceSceneId: sceneModel.sceneId,
      label: "optional animation placeholders",
      index: 7,
      scriptText: [
        "# optional animation placeholders",
        "# Add keyframes manually after review if a future guarded executor is approved.",
        "# save/render intentionally omitted",
      ].join("\n"),
    }),
  ];
  const scriptText = sections.map((section) => section.scriptText).join("\n\n");

  return {
    previewId: buildBlenderAdapterStableId("blender-python-preview", [sceneModel.sceneId]),
    sourceSceneId: sceneModel.sceneId,
    sections,
    scriptText,
    safetySummary: [
      "Python preview includes preview only comment.",
      "Script includes create materials, create objects, create lights, create camera, and configure render settings sections.",
      "Script omits save-main-file calls, render operators, shell helpers, network calls, file writes, and external process launches.",
    ],
  };
}

export function summarizeBlenderPythonPreview(preview: BlenderPythonPreview): string[] {
  return [
    `${preview.sections.length} Python preview sections generated.`,
    "Preview script text is copyable for review only; execution is blocked in Phase 62.",
  ];
}
