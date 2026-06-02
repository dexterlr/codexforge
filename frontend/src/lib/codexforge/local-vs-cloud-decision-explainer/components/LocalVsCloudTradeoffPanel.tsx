"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudTradeoff } from "../local-vs-cloud-types";

export function LocalVsCloudTradeoffPanel({ tradeoff }: { tradeoff: LocalVsCloudTradeoff }) {
  return (
    <PreviewFoundationCard title="Tradeoffs">
      <PreviewFoundationCopy>{tradeoff.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[tradeoff.localBenefit, tradeoff.cloudBenefit, tradeoff.risk]} />
    </PreviewFoundationCard>
  );
}
