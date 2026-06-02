"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ImageGenerationSummary } from "../local-image-generation-types";

export function ImageGenerationSummaryPanel({ summary }: { summary: ImageGenerationSummary }) {
  return (
    <PreviewFoundationCard title="Local image MVP summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
