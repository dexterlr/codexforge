"use client";

import { PreviewPlanListPanel } from "./PreviewPlanListPanel";
import type { BlenderScenePlan } from "../creative-types";

export function BlenderScenePlanPanel({ plan }: { plan: BlenderScenePlan }) {
  return (
    <PreviewPlanListPanel
      marker="blender"
      eyebrow="Blender scene plan"
      title="No Blender execution"
      badge={plan.adapter}
      summary={plan.summary}
      groups={[
        ["Objects", plan.sceneObjects],
        ["Materials", plan.materials],
        ["Lighting", plan.lighting],
        ["Camera", plan.camera],
        ["Animation beats", plan.animationBeats],
        ["Geometry-node hints", plan.geometryNodeHints],
        ["Render settings preview", plan.renderSettingsPreview],
      ]}
    />
  );
}
