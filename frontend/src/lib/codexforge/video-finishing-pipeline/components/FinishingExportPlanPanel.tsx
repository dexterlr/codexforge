"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { FinishingExportPlan } from "../video-finishing-types";

export function FinishingExportPlanPanel({ exportPlan }: { exportPlan: FinishingExportPlan }) {
  return (
    <PreviewFoundationCard title="Export handoff plan">
      <PreviewFoundationCopy>{exportPlan.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[exportPlan.targetFormat, exportPlan.artifactDestination]} />
    </PreviewFoundationCard>
  );
}
