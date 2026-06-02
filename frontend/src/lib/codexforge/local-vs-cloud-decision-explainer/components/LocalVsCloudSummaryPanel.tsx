"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudSummary } from "../local-vs-cloud-types";

export function LocalVsCloudSummaryPanel({ summary }: { summary: LocalVsCloudSummary }) {
  return (
    <PreviewFoundationCard title="Decision summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          `${summary.tasks.length} task examples`,
          `${summary.factors.length} decision factors`,
          summary.decision.decision,
        ]}
      />
    </PreviewFoundationCard>
  );
}
