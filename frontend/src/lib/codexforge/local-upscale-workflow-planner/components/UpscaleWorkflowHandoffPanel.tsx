"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { UpscaleWorkflowHandoff } from "../local-upscale-workflow-types";

export function UpscaleWorkflowHandoffPanel({ handoff }: { handoff: UpscaleWorkflowHandoff }) {
  return (
    <PreviewFoundationCard title="Copy upscale handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
