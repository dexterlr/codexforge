"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DraftToFinalResourcePlan } from "../draft-to-final-types";

export function DraftToFinalResourcePlanPanel({ resourcePlan }: { resourcePlan: DraftToFinalResourcePlan }) {
  return (
    <PreviewFoundationCard title="Resource posture">
      <PreviewFoundationCopy>{resourcePlan.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[resourcePlan.gpuTimePosture, resourcePlan.manualCostNote]} />
    </PreviewFoundationCard>
  );
}
