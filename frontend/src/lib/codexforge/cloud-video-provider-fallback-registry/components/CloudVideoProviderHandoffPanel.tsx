"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CloudVideoProviderHandoff } from "../cloud-video-provider-types";

export function CloudVideoProviderHandoffPanel({ handoff }: { handoff: CloudVideoProviderHandoff }) {
  return (
    <PreviewFoundationCard title="Copy provider handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
