import type { Metadata } from "next";
import {
  buildUnrealActorPlan,
  buildUnrealAdapterSafetyPolicy,
  buildUnrealAdapterSummary,
  buildUnrealAssetPlan,
  buildUnrealBlueprintPlan,
  buildUnrealBuildSettings,
  buildUnrealCommandPreview,
  buildUnrealExecutionPacket,
  buildUnrealLevelModel,
  buildUnrealMaterialPlan,
  buildUnrealProjectInput,
  buildUnrealSequencerPlan,
  validateUnrealExecutionPacket,
  validateUnrealProjectInput,
  type UnrealAdapterPreviewModel,
} from "@/lib/codexforge/unreal-adapter-preview";
import UnrealPageClient from "./page-client";

export const metadata: Metadata = {
  title: "Unreal Adapter Preview",
  description:
    "CodexForge Unreal Adapter Preview v1 for preview-only level models, actors, assets, materials, Blueprint plans, Sequencer plans, build warnings, command previews, safety policy, and future executor packets.",
};

function buildUnrealAdapterPreviewModel(): UnrealAdapterPreviewModel {
  const projectInput = buildUnrealProjectInput({
    projectGoal:
      "Cinematic-preview Unreal level for a neon city overlook with hero platform, cine-camera-actor shots, blueprint-actor-placeholder reveal cue, level-sequence pass, and package/build warnings.",
    projectKind: "cinematic-preview",
    targetPlatformLabel: "Windows cinematic review",
  });
  const projectInputValidation = validateUnrealProjectInput(projectInput);
  const levelModel = buildUnrealLevelModel(projectInput);
  const actorPlan = buildUnrealActorPlan(projectInput, levelModel);
  const assetPlan = buildUnrealAssetPlan(projectInput, levelModel);
  const materialPlan = buildUnrealMaterialPlan(projectInput, levelModel);
  const blueprintPlan = buildUnrealBlueprintPlan(projectInput, levelModel);
  const sequencerPlan = buildUnrealSequencerPlan(projectInput, levelModel, actorPlan);
  const buildSettings = buildUnrealBuildSettings(projectInput, levelModel);
  const commandPreview = buildUnrealCommandPreview({
    projectInput,
    levelModel,
    actorPlan,
    assetPlan,
    materialPlan,
    blueprintPlan,
    sequencerPlan,
    buildSettings,
  });
  const safetyPolicy = buildUnrealAdapterSafetyPolicy();
  const executionPacket = buildUnrealExecutionPacket({
    projectInput,
    levelModel,
    commandPreview,
    assetPlan,
    sequencerPlan,
    buildSettings,
    safetyPolicy,
  });
  const executionPacketValidation = validateUnrealExecutionPacket(executionPacket);
  const summary = buildUnrealAdapterSummary({
    projectValidation: projectInputValidation,
    actorPlan,
    assetPlan,
    materialPlan,
    blueprintPlan,
    sequencerPlan,
    commandPreview,
    safetyPolicy,
  });

  return {
    projectInput,
    projectInputValidation,
    levelModel,
    actorPlan,
    assetPlan,
    materialPlan,
    blueprintPlan,
    sequencerPlan,
    buildSettings,
    commandPreview,
    safetyPolicy,
    executionPacket,
    executionPacketValidation,
    summary,
  };
}

export default function UnrealPage() {
  return <UnrealPageClient initialData={buildUnrealAdapterPreviewModel()} />;
}
