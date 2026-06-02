"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { DraftToFinalSummary } from "../draft-to-final-types";

export function DraftToFinalSummaryPanel({ summary }: { summary: DraftToFinalSummary }) {
  return (
    <PreviewFoundationCard title="Final readiness summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>This is the review layer before future approved execution, not a final render executor.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
