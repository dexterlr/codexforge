import type { UnrealSequencerPlan } from "../unreal-adapter-types";
import { summarizeUnrealSequencerPlan } from "../index";
import { UnrealList, UnrealPanel } from "./UnrealPanelShared";

export function UnrealSequencerPlanPanel({ plan }: { plan: UnrealSequencerPlan }) {
  return (
    <UnrealPanel marker="UnrealSequencerPlanPanel renders" title="Sequencer Plan">
      <UnrealList title="Summary" items={summarizeUnrealSequencerPlan(plan)} />
      <UnrealList title="Shot list" items={plan.shotList.map((shot) => `${shot.label}: shot ${shot.shotId}; ${shot.cameraActor} to ${shot.targetActor}; ${shot.renderNote}`)} />
      <UnrealList title="Review notes" items={plan.reviewNotes} />
    </UnrealPanel>
  );
}
