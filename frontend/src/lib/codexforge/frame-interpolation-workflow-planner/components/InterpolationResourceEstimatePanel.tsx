"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { InterpolationResourceEstimate } from "../frame-interpolation-types";

export function InterpolationResourceEstimatePanel({ estimate }: { estimate: InterpolationResourceEstimate }) {
  return (
    <PreviewFoundationCard title="GPU and time posture">
      <PreviewFoundationCopy>{estimate.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[estimate.localGpuTimePosture, estimate.expectedWait, estimate.costSignal]} />
    </PreviewFoundationCard>
  );
}
