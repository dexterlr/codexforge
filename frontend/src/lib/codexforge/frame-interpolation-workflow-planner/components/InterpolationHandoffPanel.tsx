"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { InterpolationHandoff } from "../frame-interpolation-types";

export function InterpolationHandoffPanel({ handoff }: { handoff: InterpolationHandoff }) {
  return (
    <PreviewFoundationCard title="Copy interpolation handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
