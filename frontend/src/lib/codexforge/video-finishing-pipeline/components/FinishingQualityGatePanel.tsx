"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { FinishingQualityGate } from "../video-finishing-types";

export function FinishingQualityGatePanel({ gates }: { gates: FinishingQualityGate[] }) {
  return (
    <PreviewFoundationCard title="Quality gates">
      <PreviewFoundationCopy>Each gate should be checked before the draft becomes a final candidate.</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={gates.map((gate) => `${gate.label}: ${gate.passed ? "passed" : "needs manual review"}`)}
      />
    </PreviewFoundationCard>
  );
}
