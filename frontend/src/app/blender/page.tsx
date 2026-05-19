import type { Metadata } from "next";
import {
  buildBlenderAdapterSafetyPolicy,
  buildBlenderAdapterSummary,
  buildBlenderCameraPlan,
  buildBlenderExecutionPacket,
  buildBlenderLightingPlan,
  buildBlenderMaterialPlan,
  buildBlenderObjectPlan,
  buildBlenderPythonPreview,
  buildBlenderRenderSettings,
  buildBlenderSceneInput,
  buildBlenderSceneModel,
  validateBlenderExecutionPacket,
  validateBlenderSceneInput,
  type BlenderAdapterPreviewModel,
} from "@/lib/codexforge/blender-adapter-preview";
import BlenderPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Blender Adapter Preview",
  description:
    "CodexForge Blender Adapter Preview v1 for preview-only scene models, Blender Python script previews, safety policy, and future executor packets.",
};

function buildBlenderAdapterPreviewModel(): BlenderAdapterPreviewModel {
  const sceneInput = buildBlenderSceneInput({
    sceneGoal:
      "Cinematic product-shot preview for a premium device on a studio pedestal with imported-asset-placeholder silhouette, soft-product lighting, and a reviewable Blender script.",
    sceneKind: "cinematic",
    renderIntent: "eevee-next preview settings with cycles review option; no render execution",
  });
  const sceneInputValidation = validateBlenderSceneInput(sceneInput);
  const sceneModel = buildBlenderSceneModel(sceneInput);
  const objectPlan = buildBlenderObjectPlan(sceneInput, sceneModel);
  const materialPlan = buildBlenderMaterialPlan(sceneInput, sceneModel);
  const lightingPlan = buildBlenderLightingPlan(sceneModel);
  const cameraPlan = buildBlenderCameraPlan(sceneInput, sceneModel);
  const renderSettings = buildBlenderRenderSettings(sceneInput, sceneModel);
  const pythonPreview = buildBlenderPythonPreview({
    sceneModel,
    objectPlan,
    materialPlan,
    lightingPlan,
    cameraPlan,
    renderSettings,
  });
  const safetyPolicy = buildBlenderAdapterSafetyPolicy();
  const executionPacket = buildBlenderExecutionPacket({
    sceneInput,
    sceneModel,
    pythonPreview,
    safetyPolicy,
  });
  const executionPacketValidation = validateBlenderExecutionPacket(executionPacket);
  const summary = buildBlenderAdapterSummary({
    sceneValidation: sceneInputValidation,
    sceneModel,
    objectPlan,
    materialPlan,
    lightingPlan,
    cameraPlan,
    pythonPreview,
    safetyPolicy,
  });

  return {
    sceneInput,
    sceneInputValidation,
    sceneModel,
    objectPlan,
    materialPlan,
    lightingPlan,
    cameraPlan,
    renderSettings,
    pythonPreview,
    safetyPolicy,
    executionPacket,
    executionPacketValidation,
    summary,
  };
}

export default function BlenderPage() {
  return <BlenderPageClient initialData={buildBlenderAdapterPreviewModel()} />;
}
