"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { DryRunSummary } from "../comfyui-dry-run-types";

export function DryRunSummaryPanel({ summary }: { summary: DryRunSummary }) {
  return (
    <PreviewFoundationCard title="Dry run summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>A beginner can treat dry run as review and simulation. It is not a final render.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
