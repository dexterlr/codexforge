"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { FinishingResourcePlan } from "../video-finishing-types";

export function FinishingResourcePlanPanel({ resourcePlan }: { resourcePlan: FinishingResourcePlan }) {
  return (
    <PreviewFoundationCard title="Resource plan">
      <PreviewFoundationCopy>{resourcePlan.gpuTimePosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[resourcePlan.reviewCost, resourcePlan.manualNotes]} />
    </PreviewFoundationCard>
  );
}
