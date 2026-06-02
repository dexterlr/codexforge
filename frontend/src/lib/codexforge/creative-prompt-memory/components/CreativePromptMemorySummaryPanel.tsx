"use client";

import { PreviewFoundationCard, PreviewFoundationCopy } from "../../video-foundation-ui";
import type { CreativePromptMemorySummary } from "../creative-prompt-memory-types";

export function CreativePromptMemorySummaryPanel({ summary }: { summary: CreativePromptMemorySummary }) {
  return (
    <PreviewFoundationCard title="Creative prompt memory summary">
      <PreviewFoundationCopy>{summary.summary}</PreviewFoundationCopy>
      <PreviewFoundationCopy>
        A prompt memory is a useful prompt idea you may want to reuse later. It is only a suggestion until you review it.
      </PreviewFoundationCopy>
    </PreviewFoundationCard>
  );
}
