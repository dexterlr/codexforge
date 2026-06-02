"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { DualGpuWorkerSummary } from "../dual-gpu-worker-types";

export function DualGpuWorkerSummaryPanel({ summary }: { summary: DualGpuWorkerSummary }) {
  return (
    <PreviewFoundationCard title="Dual-GPU summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Two GPUs are best treated as parallel workers unless a workflow explicitly supports multi-GPU.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
