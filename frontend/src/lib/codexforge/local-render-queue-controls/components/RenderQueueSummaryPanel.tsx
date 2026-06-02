"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { RenderQueueSummary } from "../local-render-queue-types";

export function RenderQueueSummaryPanel({ summary }: { summary: RenderQueueSummary }) {
  return (
    <PreviewFoundationCard title="Render queue summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Preview-only controls explain pause, resume, cancel, retry, hold, prioritize, and review before run.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
