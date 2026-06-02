"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { GpuJobSchedulerHandoff } from "../local-gpu-scheduler-types";

export function GpuJobSchedulerHandoffPanel({ handoff }: { handoff: GpuJobSchedulerHandoff }) {
  return (
    <PreviewFoundationCard title="Copy schedule handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
