"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationHandoff } from "../local-image-generation-types";

export function ImageGenerationHandoffPanel({ handoff }: { handoff: ImageGenerationHandoff }) {
  return (
    <PreviewFoundationCard title="Image handoff">
      <PreviewFoundationCopy>{handoff.nextStep}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[handoff.copyLabel, handoff.requestHandoff, handoff.resultHandoff]} />
    </PreviewFoundationCard>
  );
}
