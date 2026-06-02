"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { SubmitBoundaryHandoff } from "../comfyui-submit-boundary-types";

export function SubmitBoundaryHandoffPanel({ handoff }: { handoff: SubmitBoundaryHandoff }) {
  return (
    <PreviewFoundationCard title="Copy submit handoffs">
      <PreviewFoundationPillList items={[handoff.submitPacketLabel, handoff.safetyReportLabel, handoff.nextImplementationHandoffLabel]} />
      <PreviewFoundationCopy>{handoff.safetyNote}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
