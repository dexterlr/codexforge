"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { FinishingSummary } from "../video-finishing-types";

export function FinishingSummaryPanel({ summary }: { summary: FinishingSummary }) {
  return (
    <PreviewFoundationCard title="Finishing summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>A finishing pipeline reviews the draft, checks polish choices, and prepares a final handoff without changing video.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
