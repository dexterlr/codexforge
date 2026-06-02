"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { SubmitBoundarySummary } from "../comfyui-submit-boundary-types";

export function SubmitBoundarySummaryPanel({ summary }: { summary: SubmitBoundarySummary }) {
  return (
    <PreviewFoundationCard title="Submit boundary summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Submit requires approval and a later guarded local executor. This page prepares the boundary only.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
