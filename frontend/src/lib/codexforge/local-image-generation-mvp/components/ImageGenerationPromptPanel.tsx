"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationPrompt } from "../local-image-generation-types";

export function ImageGenerationPromptPanel({ prompt }: { prompt: ImageGenerationPrompt }) {
  return (
    <PreviewFoundationCard title="Prompt review">
      <PreviewFoundationCopy>Copy image request allowed. The prompt is not sent anywhere from this screen.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={[prompt.positive, prompt.negative, prompt.styleGuide, prompt.copyLabel]} />
    </PreviewFoundationCard>
  );
}
