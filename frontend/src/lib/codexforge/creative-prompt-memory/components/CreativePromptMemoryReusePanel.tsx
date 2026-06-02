"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { CreativePromptMemoryReuse } from "../creative-prompt-memory-types";

export function CreativePromptMemoryReusePanel({ reuse }: { reuse: CreativePromptMemoryReuse }) {
  return (
    <PreviewFoundationCard title="What can be reused">
      <PreviewFoundationCopy>Reuse is limited to reviewed wording, tags, and handoff text. It does not run creative jobs.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[...reuse.allowedReuse, ...reuse.suggestionsOnly, ...reuse.blockedReuse]} />
    </PreviewFoundationCard>
  );
}
