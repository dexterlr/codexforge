"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { CreativeCostSaverHandoff } from "../creative-cost-saver-types";

export function CreativeCostSaverHandoffPanel({ handoff }: { handoff: CreativeCostSaverHandoff }) {
  return (
    <PreviewFoundationCard title="Copy cost-saving handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
