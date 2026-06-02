"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DraftToFinalDecision } from "../draft-to-final-types";

export function DraftToFinalDecisionPanel({ decision }: { decision: DraftToFinalDecision }) {
  return (
    <PreviewFoundationCard title="Readiness decision">
      <PreviewFoundationCopy>{decision.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[decision.state]} />
    </PreviewFoundationCard>
  );
}
