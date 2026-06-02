"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuJobSchedulePreview } from "../local-gpu-scheduler-types";

export function GpuJobSchedulePreviewPanel({ schedule }: { schedule: GpuJobSchedulePreview }) {
  return (
    <PreviewFoundationCard title="Schedule preview">
      <PreviewFoundationCopy>{schedule.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={schedule.lanes} />
      <PreviewFoundationCopy>Execution allowed: no.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
