"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoDraftComparisonSummary } from "../video-draft-comparison-types";

export function VideoDraftComparisonSummaryPanel({ summary }: { summary: VideoDraftComparisonSummary }) {
  return (
    <PreviewFoundationCard title="Draft comparison summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Drafts will appear later after artifacts are safely supplied.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
