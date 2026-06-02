"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DraftToFinalPipeline } from "../draft-to-final-types";

export function DraftToFinalPipelinePanel({ pipeline }: { pipeline: DraftToFinalPipeline }) {
  return (
    <PreviewFoundationCard title="Draft-to-final path">
      <PreviewFoundationCopy>{pipeline.localFirstPosture}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={pipeline.stages} />
    </PreviewFoundationCard>
  );
}
