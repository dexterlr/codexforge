"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { StylePresetSafety } from "../style-preset-types";

export function StylePresetSafetyPanel({ safety }: { safety: StylePresetSafety }) {
  return (
    <PreviewFoundationCard title="Safety">
      <PreviewFoundationCopy>No provider calls. No image/video generation. Nothing is secretly sent to an AI provider.</PreviewFoundationCopy>
      <PreviewFoundationPillList items={safety.rules} />
    </PreviewFoundationCard>
  );
}
