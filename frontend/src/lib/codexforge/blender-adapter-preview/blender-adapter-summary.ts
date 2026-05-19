import type {
  BlenderAdapterSummary,
  BlenderCameraPlan,
  BlenderLightingPlan,
  BlenderMaterialPlan,
  BlenderObjectPlan,
  BlenderPythonPreview,
  BlenderSceneInputValidation,
  BlenderSceneModel,
  BlenderAdapterSafetyPolicy,
} from "./blender-adapter-types";

export function buildBlenderAdapterSummary(args: {
  sceneValidation: BlenderSceneInputValidation;
  sceneModel: BlenderSceneModel;
  objectPlan: BlenderObjectPlan;
  materialPlan: BlenderMaterialPlan;
  lightingPlan: BlenderLightingPlan;
  cameraPlan: BlenderCameraPlan;
  pythonPreview: BlenderPythonPreview;
  safetyPolicy: BlenderAdapterSafetyPolicy;
}): BlenderAdapterSummary {
  return {
    sceneReady: args.sceneValidation.valid,
    objectCount: args.objectPlan.items.length,
    materialCount: args.materialPlan.items.length,
    lightCount: args.lightingPlan.items.length,
    cameraShotCount: args.cameraPlan.shots.length,
    scriptPreviewReady: args.pythonPreview.scriptText.length > 0,
    policyPosture: args.safetyPolicy.executionAllowed ? "execution allowed" : "preview-only/request-ready",
    executionBlockedCount: args.safetyPolicy.blockedReasons.length,
    nextSafeAction: args.safetyPolicy.nextSafeAction,
  };
}

export function summarizeBlenderAdapterSession(summary: BlenderAdapterSummary): string[] {
  return [
    summary.sceneReady ? "Scene ready for operator review." : "Scene needs review.",
    `${summary.objectCount} objects, ${summary.materialCount} materials, ${summary.lightCount} lights, ${summary.cameraShotCount} camera shots.`,
    `Policy posture: ${summary.policyPosture}; blocked reasons: ${summary.executionBlockedCount}.`,
    summary.nextSafeAction,
  ];
}
