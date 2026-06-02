"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { AssetDependencySummary } from "../asset-dependency-types";

export function AssetDependencySummaryPanel({ summary }: { summary: AssetDependencySummary }) {
  return (
    <PreviewFoundationCard title="Asset summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>Missing model note and missing custom node note are planning labels only, not scans of your machine.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
