"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { UpscaleWorkflowPlan } from "../local-upscale-workflow-types";

export function UpscaleWorkflowPlanPanel({ plan }: { plan: UpscaleWorkflowPlan }) {
  return (
    <PreviewFoundationCard title="Upscale plan">
      <PreviewFoundationCopy>{plan.localFirstPosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `Source: ${plan.sourceDraft}`,
          `Target: ${plan.targetResolution}`,
          `Quality: ${plan.qualityTarget}`,
          `Destination: ${plan.artifactDestination}`,
          plan.noAutoRun ? "No-auto-run guarantee" : "Needs review",
        ]}
      />
    </PreviewFoundationCard>
  );
}
