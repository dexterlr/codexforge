"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { ImageGenerationSafety } from "../local-image-generation-types";

export function ImageGenerationSafetyPanel({ safety }: { safety: ImageGenerationSafety }) {
  return (
    <PreviewFoundationCard title="Safety review">
      <PreviewFoundationCopy>{safety.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList
        items={[
          "local-only",
          "approval required",
          "no cloud spend",
          "no ComfyUI call",
          "no auto-run",
          "no secret exposure",
        ]}
      />
    </PreviewFoundationCard>
  );
}
