"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { LocalVsCloudDecision } from "../local-vs-cloud-types";

export function LocalVsCloudDecisionPanel({ decision }: { decision: LocalVsCloudDecision }) {
  return (
    <PreviewFoundationCard title="Best route">
      <PreviewFoundationCopy>{decision.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[decision.label, ...decision.reasons]} />
    </PreviewFoundationCard>
  );
}
