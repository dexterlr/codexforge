"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { KeyframeGenerationSummary } from "../local-keyframe-generation-types";

export function KeyframeGenerationSummaryPanel({ summary }: { summary: KeyframeGenerationSummary }) {
  return (
    <PreviewFoundationCard title="Local keyframes MVP summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
