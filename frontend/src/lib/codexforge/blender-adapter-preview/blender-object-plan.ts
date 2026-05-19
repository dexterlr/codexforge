import type {
  BlenderObjectItem,
  BlenderObjectPlan,
  BlenderObjectType,
  BlenderSceneInput,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

function inferObjectType(label: string): BlenderObjectType {
  const normalized = label.toLowerCase();
  if (normalized.includes("sphere")) return "sphere";
  if (normalized.includes("cylinder") || normalized.includes("pedestal")) return "cylinder";
  if (normalized.includes("plane") || normalized.includes("floor")) return "plane";
  if (normalized.includes("text") || normalized.includes("title")) return "text";
  if (normalized.includes("curve")) return "curve";
  if (normalized.includes("camera-target")) return "camera-target";
  if (normalized.includes("light-helper")) return "light-helper";
  if (normalized.includes("imported") || normalized.includes("asset-placeholder")) {
    return "imported-asset-placeholder";
  }
  if (normalized.includes("cube") || normalized.includes("product")) return "cube";
  return "unknown";
}

export function buildBlenderObjectItem(input: {
  label: string;
  index?: number;
  materialId?: string;
  sceneId?: string;
  objectType?: BlenderObjectType;
  role?: string;
}): BlenderObjectItem {
  const index = input.index ?? 0;
  const objectType = input.objectType ?? inferObjectType(input.label);

  return {
    objectId: buildBlenderAdapterStableId("blender-object", [
      input.sceneId ?? "scene",
      input.label,
      String(index),
    ]),
    label: input.label,
    objectType,
    role: input.role ?? (index === 0 ? "primary subject" : "supporting scene element"),
    locationHint: index === 0 ? "0, 0, 1" : `${index * 1.5 - 1.5}, ${index % 2 === 0 ? 1 : -1}, 0.5`,
    rotationHint: "0, 0, 0",
    scaleHint: objectType === "plane" ? "6, 6, 1" : "1, 1, 1",
    materialId: input.materialId ?? `mat-${index + 1}`,
    animationNote: index === 0 ? "optional turntable placeholder only" : "static preview object",
    geometryNodeHint: "No geometry nodes generated; placeholder note only.",
    riskNote:
      objectType === "imported-asset-placeholder"
        ? "Imported assets are placeholders only; no asset load or file read is attempted."
        : "Primitive preview only.",
  };
}

export function buildBlenderObjectPlan(
  input: BlenderSceneInput,
  model: BlenderSceneModel
): BlenderObjectPlan {
  const labels = input.objectHints.length > 0 ? input.objectHints : ["hero cube", "floor plane"];
  const items = labels.map((label, index) =>
    buildBlenderObjectItem({
      label,
      index,
      sceneId: model.sceneId,
      materialId: `mat-${(index % Math.max(input.materialHints.length, 1)) + 1}`,
    })
  );

  return {
    planId: buildBlenderAdapterStableId("blender-object-plan", [model.sceneId]),
    sourceSceneId: model.sceneId,
    items,
    summary: summarizeBlenderObjectPlan({ planId: "pending", sourceSceneId: model.sceneId, items, summary: [] }),
  };
}

export function summarizeBlenderObjectPlan(plan: BlenderObjectPlan): string[] {
  return [
    `${plan.items.length} object preview items planned.`,
    "Object plan supports cube, sphere, cylinder, plane, text, curve, camera-target, light-helper, imported-asset-placeholder, and unknown.",
  ];
}
