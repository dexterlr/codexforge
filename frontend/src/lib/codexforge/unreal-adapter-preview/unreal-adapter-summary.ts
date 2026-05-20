import type {
  UnrealActorPlan,
  UnrealAdapterSafetyPolicy,
  UnrealAdapterSummary,
  UnrealAssetPlan,
  UnrealBlueprintPlan,
  UnrealCommandPreview,
  UnrealMaterialPlan,
  UnrealProjectInputValidation,
  UnrealSequencerPlan,
} from "./unreal-adapter-types";

export function buildUnrealAdapterSummary(args: {
  projectValidation: UnrealProjectInputValidation;
  actorPlan: UnrealActorPlan;
  assetPlan: UnrealAssetPlan;
  materialPlan: UnrealMaterialPlan;
  blueprintPlan: UnrealBlueprintPlan;
  sequencerPlan: UnrealSequencerPlan;
  commandPreview: UnrealCommandPreview;
  safetyPolicy: UnrealAdapterSafetyPolicy;
}): UnrealAdapterSummary {
  return {
    projectReady: args.projectValidation.valid,
    actorCount: args.actorPlan.items.length,
    assetCount: args.assetPlan.items.length,
    materialCount: args.materialPlan.items.length,
    blueprintCount: args.blueprintPlan.items.length,
    sequencerShotCount: args.sequencerPlan.shotList.length,
    commandPreviewReady: args.commandPreview.previewText.length > 0,
    policyPosture: args.safetyPolicy.executionAllowed ? "execution allowed" : "preview-only/request-ready",
    executionBlockedCount: args.safetyPolicy.blockedReasons.length,
    nextSafeAction: args.safetyPolicy.nextSafeAction,
  };
}

export function summarizeUnrealAdapterSession(summary: UnrealAdapterSummary): string[] {
  return [
    summary.projectReady ? "Project ready for operator review." : "Project needs review.",
    `${summary.actorCount} actors, ${summary.assetCount} assets, ${summary.materialCount} materials, ${summary.blueprintCount} blueprints, ${summary.sequencerShotCount} Sequencer shots.`,
    `Policy posture: ${summary.policyPosture}; blocked reasons: ${summary.executionBlockedCount}.`,
    summary.nextSafeAction,
  ];
}
