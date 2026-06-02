"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { ConsistencyKitSummary } from "../consistency-kit-types";

export function ConsistencyKitSummaryPanel({ summary }: { summary: ConsistencyKitSummary }) {
  return (
    <PreviewFoundationCard title="Consistency kit summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>
        Consistency matters because repeated subjects can drift between prompts, keyframes, and drafts if their identity cues are not reviewed.
      </PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
