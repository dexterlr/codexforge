"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemoryHandoff } from "../creative-prompt-memory-types";

export function CreativePromptMemoryHandoffPanel({ handoff }: { handoff: CreativePromptMemoryHandoff }) {
  return (
    <PreviewFoundationCard title="Prompt memory handoff">
      <PreviewFoundationCopy>{handoff.copyLabel}</PreviewFoundationCopy>
      <PreviewFoundationCopy>{handoff.reviewReminder}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.handoffText]} />
    </PreviewFoundationCard>
  );
}
