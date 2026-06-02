"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { UpscaleResourceEstimate } from "../local-upscale-workflow-types";

export function UpscaleResourceEstimatePanel({ estimate }: { estimate: UpscaleResourceEstimate }) {
  return (
    <PreviewFoundationCard title="GPU and time posture">
      <PreviewFoundationCopy>{estimate.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[estimate.gpuTimePosture, estimate.expectedWait, estimate.costSignal]} />
    </PreviewFoundationCard>
  );
}
