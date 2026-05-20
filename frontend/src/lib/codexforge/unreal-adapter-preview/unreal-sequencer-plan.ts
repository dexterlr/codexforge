import type {
  UnrealActorPlan,
  UnrealLevelModel,
  UnrealProjectInput,
  UnrealSequencerPlan,
  UnrealSequencerShot,
} from "./unreal-adapter-types";
import { buildUnrealAdapterStableId } from "./unreal-adapter-types";

export function buildUnrealSequencerShot(input: {
  label: string;
  index?: number;
  levelId?: string;
  cameraActor?: string;
  targetActor?: string;
}): UnrealSequencerShot {
  const index = input.index ?? 0;
  return {
    shotId: buildUnrealAdapterStableId("unreal-sequencer-shot", [
      input.levelId ?? "level",
      input.label,
      String(index),
    ]),
    label: input.label,
    cameraActor: input.cameraActor ?? "cine-camera-actor placeholder",
    targetActor: input.targetActor ?? "hero static mesh platform",
    movement: index === 0 ? "slow establishing crane" : "controlled push or pan",
    durationEstimate: index === 0 ? "5 seconds" : "3 seconds",
    lensFocalHint: index === 0 ? "24mm cinematic wide" : "50mm detail lens",
    trackNotes: ["camera cut track placeholder", "transform track placeholder", "manual review required"],
    transitionNote: index === 0 ? "hard cut from slate" : "straight cut; no rendered transition",
    renderNote: "Render/movie queue blocked in Phase 65; shot is planning metadata only.",
  };
}

export function buildUnrealSequencerPlan(
  input: UnrealProjectInput,
  model: UnrealLevelModel,
  actorPlan?: UnrealActorPlan
): UnrealSequencerPlan {
  const cameraActor =
    actorPlan?.items.find((item) => item.actorType.includes("camera"))?.label ?? "cine-camera-actor placeholder";
  const targetActor = actorPlan?.items[0]?.label ?? "hero actor placeholder";
  const shotList = input.sequencerCameraHints.map((label, index) =>
    buildUnrealSequencerShot({ label, index, levelId: model.levelId, cameraActor, targetActor })
  );

  return {
    sequenceId: buildUnrealAdapterStableId("unreal-sequence", [model.levelId, input.cinematicIntent]),
    sequenceLabel: "Unreal cinematic sequence preview",
    shotList,
    cameraCuts: shotList.map((shot) => `${shot.label}: ${shot.cameraActor}`),
    animationTracks: ["hero actor transform placeholder", "light intensity cue placeholder"],
    audioPlaceholder: "No audio import; optional reviewed sound placeholder only.",
    renderOutputPlaceholder: "artifacts/codexforge/unreal/unreal-cinematic-preview.mp4 placeholder only",
    reviewNotes: [
      "Sequencer plan supports shot entries and camera cuts.",
      "No render execution.",
      "No Movie Render Queue execution.",
    ],
  };
}

export function summarizeUnrealSequencerPlan(plan: UnrealSequencerPlan): string[] {
  return [
    `${plan.shotList.length} Sequencer shot preview item(s).`,
    `${plan.cameraCuts.length} camera cut placeholder(s); render output is a placeholder only.`,
  ];
}
