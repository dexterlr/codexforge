"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { RenderVersionLineage } from "../render-version-history-types";

export function RenderVersionLineagePanel({ lineage }: { lineage: RenderVersionLineage }) {
  return (
    <PreviewFoundationCard title="Version lineage">
      <PreviewFoundationCopy>{`Root ${lineage.rootVersionId}; latest ${lineage.latestVersionId}.`}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={lineage.steps} />
    </PreviewFoundationCard>
  );
}
