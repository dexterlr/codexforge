"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { GpuWorkerRoutingStrategy } from "../dual-gpu-worker-types";

export function GpuWorkerRoutingStrategyPanel({ strategy }: { strategy: GpuWorkerRoutingStrategy }) {
  return (
    <PreviewFoundationCard title="Routing strategy">
      <PreviewFoundationCopy>{strategy.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={strategy.rules} />
      <PreviewFoundationCopy>{strategy.combinedVramWarning}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
