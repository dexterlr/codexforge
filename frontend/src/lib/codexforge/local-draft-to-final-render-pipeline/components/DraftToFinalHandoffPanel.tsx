"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { DraftToFinalHandoff } from "../draft-to-final-types";

export function DraftToFinalHandoffPanel({ handoff }: { handoff: DraftToFinalHandoff }) {
  return (
    <PreviewFoundationCard title="Copy final render handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
