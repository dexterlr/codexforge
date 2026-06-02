"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { InterpolationWorkflowPlan } from "../frame-interpolation-types";

export function InterpolationWorkflowPlanPanel({ plan }: { plan: InterpolationWorkflowPlan }) {
  return (
    <PreviewFoundationCard title="Interpolation plan">
      <PreviewFoundationCopy>{plan.localGpuTimePosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `Source: ${plan.sourceDraft}`,
          `Source FPS: ${plan.sourceFps}`,
          `Target FPS: ${plan.targetFps}`,
          `Smoothness: ${plan.smoothnessTarget}`,
          plan.noAutoRun ? "No-auto-run guarantee" : "Needs review",
        ]}
      />
    </PreviewFoundationCard>
  );
}
