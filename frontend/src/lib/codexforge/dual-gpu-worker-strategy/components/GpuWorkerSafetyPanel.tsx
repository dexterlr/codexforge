"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuWorkerSafety } from "../dual-gpu-worker-types";

export function GpuWorkerSafetyPanel({ safety }: { safety: GpuWorkerSafety }) {
  return (
    <PreviewFoundationCard title="Worker safety">
      <PreviewFoundationPillList items={safety.notes} />
      <PreviewFoundationCopy>{safety.blocked}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
