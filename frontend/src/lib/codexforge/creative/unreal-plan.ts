import type { CreativeBrief, Storyboard, UnrealLevelPlan } from "./creative-types";

export function summarizeUnrealLevelPlan(plan: UnrealLevelPlan): string {
  return `Unreal cinematic preview: ${plan.actorsAssets.length} actor/asset hint(s), ${plan.sequencerCameraBeats.length} sequencer beat(s), adapter ${plan.adapter}, approval required.`;
}

export function buildUnrealLevelPlan(brief: CreativeBrief, storyboard: Storyboard): UnrealLevelPlan {
  const plan = {
    id: "unreal-level-plan:phase-7",
    adapter: "unreal-editor-command",
    approvalRequired: true,
    levelIntent: `Create an Unreal cinematic planning layer for ${brief.title}; preview commands only.`,
    actorsAssets: [
      "BP_CodexForgeConsole placeholder",
      "SM_StoryboardWall placeholder",
      "BP_RenderQueueStatus placeholder",
      "SM_ApprovalGate placeholder",
    ],
    blueprintScriptHints: [
      "Blueprint construction script arranges storyboard panels by stable shot id.",
      "Editor utility command would create preview actors only after approval.",
      "Artifact labels remain placeholder text until approved materialization.",
    ],
    sequencerCameraBeats: storyboard.shots.map((shot) => `Shot ${shot.shotNumber}: ${shot.camera}, ${shot.movement}, ${shot.durationEstimate}`),
    packagingBuildWarning: "Packaging and build steps are not part of this preview; any future Unreal command requires explicit approval.",
    summary: "",
  } satisfies UnrealLevelPlan;

  return { ...plan, summary: summarizeUnrealLevelPlan(plan) };
}
