"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoDraftSummary } from "../local-video-draft-types";

export function VideoDraftSummaryPanel({ summary }: { summary: VideoDraftSummary }) {
  return (
    <PreviewFoundationCard title="Local video draft MVP summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
