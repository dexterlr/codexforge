"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { RenderVersionHistorySummary } from "../render-version-history-types";

export function RenderVersionHistorySummaryPanel({ summary }: { summary: RenderVersionHistorySummary }) {
  return (
    <PreviewFoundationCard title="History summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Latest means latest preview record, not proof that the version is ready to export.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
