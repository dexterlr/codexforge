import type {
  BlenderCameraPlan,
  BlenderCameraShot,
  BlenderSceneInput,
  BlenderSceneModel,
} from "./blender-adapter-types";
import { buildBlenderAdapterStableId } from "./blender-adapter-types";

export function buildBlenderCameraShot(input: {
  label: string;
  index?: number;
  sceneId?: string;
  purpose?: string;
}): BlenderCameraShot {
  const index = input.index ?? 0;
  return {
    shotId: buildBlenderAdapterStableId("blender-shot", [
      input.sceneId ?? "scene",
      input.label,
      String(index),
    ]),
    label: input.label,
    cameraLocationHint: index === 0 ? "4, -5, 3" : "0, -6, 4",
    targetHint: "subject center",
    focalLengthHint: index === 0 ? "50mm" : "35mm",
    movement: index === 0 ? "locked camera" : "optional dolly placeholder",
    durationEstimate: index === 0 ? "single still frame" : "3 seconds placeholder",
    framing: index === 0 ? "three-quarter hero framing" : "wide context framing",
    purpose: input.purpose ?? "shot review only; no timeline execution",
  };
}

export function buildBlenderCameraPlan(
  input: BlenderSceneInput,
  model: BlenderSceneModel
): BlenderCameraPlan {
  const labels = input.cameraHints.length > 0 ? input.cameraHints : ["hero shot"];
  const shots = labels.map((label, index) =>
    buildBlenderCameraShot({ label, index, sceneId: model.sceneId })
  );

  return {
    planId: buildBlenderAdapterStableId("blender-camera-plan", [model.sceneId]),
    sourceSceneId: model.sceneId,
    shots,
    summary: summarizeBlenderCameraPlan({ planId: "pending", sourceSceneId: model.sceneId, shots, summary: [] }),
  };
}

export function summarizeBlenderCameraPlan(plan: BlenderCameraPlan): string[] {
  return [
    `${plan.shots.length} camera shot preview entries planned.`,
    "Camera plan supports shot labels, target hints, focal length hints, framing, movement, and purpose.",
  ];
}
