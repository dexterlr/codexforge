"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { VideoDraftComparisonHandoff } from "../video-draft-comparison-types";

export function VideoDraftComparisonHandoffPanel({ handoff }: { handoff: VideoDraftComparisonHandoff }) {
  return (
    <PreviewFoundationCard title="Copy comparison handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
