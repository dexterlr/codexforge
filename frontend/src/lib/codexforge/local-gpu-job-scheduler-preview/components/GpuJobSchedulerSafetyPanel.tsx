"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuJobSchedulerSafety } from "../local-gpu-scheduler-types";

export function GpuJobSchedulerSafetyPanel({ safety }: { safety: GpuJobSchedulerSafety }) {
  return (
    <PreviewFoundationCard title="Scheduler safety">
      <PreviewFoundationPillList items={safety.notes} />
      <PreviewFoundationCopy>{safety.blocked}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
