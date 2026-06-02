"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { LiveHealthProbeSummary } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeSummaryPanel({ summary }: { summary: LiveHealthProbeSummary }) {
  return (
    <PreviewFoundationCard title="Health gate summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Nothing contacts ComfyUI yet. This page only explains whether a future local health probe could be safe.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
