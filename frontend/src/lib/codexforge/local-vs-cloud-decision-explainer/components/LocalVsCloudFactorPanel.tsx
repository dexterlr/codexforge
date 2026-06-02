"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudFactor } from "../local-vs-cloud-types";

export function LocalVsCloudFactorPanel({ factors }: { factors: LocalVsCloudFactor[] }) {
  return (
    <PreviewFoundationCard title="Decision factors">
      <PreviewFoundationCopy>Factors explain the tradeoff before any provider is called.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={factors.map((factor) => factor.factor)} />
      <PreviewFoundationCopy>{factors[0]?.plainEnglish ?? "Privacy and cost are checked first."}</PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
