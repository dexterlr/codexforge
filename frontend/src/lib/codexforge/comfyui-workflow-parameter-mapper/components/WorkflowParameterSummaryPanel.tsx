"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { WorkflowParameterSummary } from "../workflow-parameter-types";

export function WorkflowParameterSummaryPanel({ summary }: { summary: WorkflowParameterSummary }) {
  return (
    <PreviewFoundationCard title="Parameter map summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Safe editable values are separated from advanced, blocked, and unknown values.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
