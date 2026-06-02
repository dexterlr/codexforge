"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { LiveHealthProbeHandoff } from "../comfyui-live-health-gate-types";

export function LiveHealthProbeHandoffPanel({ handoff }: { handoff: LiveHealthProbeHandoff }) {
  return (
    <PreviewFoundationCard title="Copy health handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
