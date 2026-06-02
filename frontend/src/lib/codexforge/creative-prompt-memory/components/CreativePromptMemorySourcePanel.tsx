"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemorySource } from "../creative-prompt-memory-types";

export function CreativePromptMemorySourcePanel({ sources }: { sources: CreativePromptMemorySource[] }) {
  return (
    <PreviewFoundationCard title="Sources">
      <PreviewFoundationCopy>
        A source shows where the idea came from, such as video prompt, storyboard, keyframe plan, local image request, local keyframe request, local video draft request, artifact review note, or manual note.
      </PreviewFoundationCopy>
      <PreviewFoundationPillList items={sources.map((source) => `${source.label}: ${source.reviewBoundary}`)} />
    </PreviewFoundationCard>
  );
}
