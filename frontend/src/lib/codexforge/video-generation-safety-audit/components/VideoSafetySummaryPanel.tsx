"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { VideoSafetySummary } from "../video-generation-safety-types";

export function VideoSafetySummaryPanel({ summary }: { summary: VideoSafetySummary }) {
  return (
    <PreviewFoundationCard title="Audit summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `${summary.passCount} pass`,
          `${summary.warnCount} warn`,
          `${summary.blockCount} block`,
          summary.audit.decision.status,
        ]}
      />
    </PreviewFoundationCard>
  );
}
