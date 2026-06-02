"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudHandoff } from "../local-vs-cloud-types";

export function LocalVsCloudHandoffPanel({ handoff }: { handoff: LocalVsCloudHandoff }) {
  return (
    <PreviewFoundationCard title="Copy decision handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={handoff.packet} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
