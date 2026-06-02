"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { GpuJobPriority } from "../local-gpu-scheduler-types";

export function GpuJobPriorityPanel({ priorities }: { priorities: GpuJobPriority[] }) {
  return (
    <PreviewFoundationCard title="Priority preview">
      {priorities.map((priority) => (
        <PreviewFoundationCopy key={priority.id}>{priority.level}: {priority.reason}</PreviewFoundationCopy>
      ))}
    </PreviewFoundationCard>
  );
}
