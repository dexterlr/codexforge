"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { FinishingPipeline } from "../video-finishing-types";

export function FinishingPipelinePanel({ pipeline }: { pipeline: FinishingPipeline }) {
  return (
    <PreviewFoundationCard title="Pipeline posture">
      <PreviewFoundationCopy>{pipeline.localFirstPosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          pipeline.title,
          pipeline.approvalRequired ? "Approval required" : "Needs review",
          pipeline.noAutoRun ? "No-auto-run guarantee" : "Needs review",
        ]}
      />
    </PreviewFoundationCard>
  );
}
