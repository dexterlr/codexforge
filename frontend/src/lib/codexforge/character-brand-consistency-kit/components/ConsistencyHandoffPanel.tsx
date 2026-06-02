"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ConsistencyHandoff } from "../consistency-kit-types";

export function ConsistencyHandoffPanel({ handoff }: { handoff: ConsistencyHandoff }) {
  return (
    <PreviewFoundationCard title="Consistency handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.reviewReminder}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.handoffText]} />
    </PreviewFoundationCard>
  );
}
