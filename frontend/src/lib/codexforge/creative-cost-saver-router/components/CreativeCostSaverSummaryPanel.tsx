"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { CreativeCostSaverSummary } from "../creative-cost-saver-types";

export function CreativeCostSaverSummaryPanel({ summary }: { summary: CreativeCostSaverSummary }) {
  return (
    <PreviewFoundationCard title="Cost saver summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>local drafts save money, cloud final renders are optional later, and nothing renders until explicitly approved.</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
