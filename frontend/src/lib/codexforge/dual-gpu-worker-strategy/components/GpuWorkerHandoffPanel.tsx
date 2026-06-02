"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { GpuWorkerHandoff } from "../dual-gpu-worker-types";

export function GpuWorkerHandoffPanel({ handoff }: { handoff: GpuWorkerHandoff }) {
  return (
    <PreviewFoundationCard title="Copy worker handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
