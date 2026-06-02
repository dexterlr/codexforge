"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { GpuJobSchedulerSummary } from "../local-gpu-scheduler-types";

export function GpuJobSchedulerSummaryPanel({ summary }: { summary: GpuJobSchedulerSummary }) {
  return (
    <PreviewFoundationCard title="Scheduler summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>This is a plan, not execution. Heavy jobs and queues are explained before any future approved runner exists.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
