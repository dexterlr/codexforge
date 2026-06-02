"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetyAudit } from "../video-generation-safety-types";

export function VideoSafetyAuditPanel({ audit }: { audit: VideoSafetyAudit }) {
  return (
    <PreviewFoundationCard title={audit.title}>
      <PreviewFoundationCopy>{audit.summary}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[audit.decision.status, `${audit.checks.length} checks`, `${audit.risks.length} risks`]} />
    </PreviewFoundationCard>
  );
}
