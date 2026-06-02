"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { DryRunDecision } from "../comfyui-dry-run-types";

export function DryRunDecisionPanel({ decision }: { decision: DryRunDecision }) {
  return (
    <PreviewFoundationCard title="Dry run decision">
      <PreviewFoundationCopy>{decision.label}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{decision.explanation}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[decision.status, decision.submitReviewAllowed ? "submit review can be prepared" : "submit review blocked"]} />
    </PreviewFoundationCard>
  );
}
