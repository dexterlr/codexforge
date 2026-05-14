"use client";

import { PreviewPlanListPanel } from "./PreviewPlanListPanel";
import type { UnrealLevelPlan } from "../creative-types";

export function UnrealLevelPlanPanel({ plan }: { plan: UnrealLevelPlan }) {
  return (
    <PreviewPlanListPanel
      marker="unreal"
      eyebrow="Unreal level plan"
      title="No Unreal execution"
      badge={plan.adapter}
      summary={plan.summary}
      groups={[
        ["Level intent", [plan.levelIntent]],
        ["Actors and assets", plan.actorsAssets],
        ["Blueprint and script hints", plan.blueprintScriptHints],
        ["Sequencer and camera beats", plan.sequencerCameraBeats],
        ["Packaging warning", [plan.packagingBuildWarning]],
      ]}
    />
  );
}
