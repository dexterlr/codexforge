"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemoryTag } from "../creative-prompt-memory-types";

export function CreativePromptMemoryTagPanel({ tags }: { tags: CreativePromptMemoryTag[] }) {
  return (
    <PreviewFoundationCard title="Reuse tags">
      <PreviewFoundationCopy>Reuse tags make a useful pattern easier to find without saving anything secretly.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={tags.map((tag) => `${tag.label}: ${tag.candidateIds.join(", ")}`)} />
    </PreviewFoundationCard>
  );
}
