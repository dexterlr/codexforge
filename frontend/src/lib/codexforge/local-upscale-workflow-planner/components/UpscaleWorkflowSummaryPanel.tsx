"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { UpscaleWorkflowSummary } from "../local-upscale-workflow-types";

export function UpscaleWorkflowSummaryPanel({ summary }: { summary: UpscaleWorkflowSummary }) {
  return (
    <PreviewFoundationCard title="Upscale summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Upscaling is planned only after the draft is reviewed, because polishing the wrong draft wastes local GPU time.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
