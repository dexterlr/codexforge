"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudFinalRenderHandoff } from "../cloud-final-render-types";

export function CloudFinalRenderHandoffPanel({ handoff }: { handoff: CloudFinalRenderHandoff }) {
  return (
    <PreviewFoundationCard title="Copy manual handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
