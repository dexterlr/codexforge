"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { FinishingHandoff } from "../video-finishing-types";

export function FinishingHandoffPanel({ handoff }: { handoff: FinishingHandoff }) {
  return (
    <PreviewFoundationCard title="Copy finishing handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
