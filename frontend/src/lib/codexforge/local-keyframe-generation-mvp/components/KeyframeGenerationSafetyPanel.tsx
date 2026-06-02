"use client";

import { PreviewFoundationCard, PreviewFoundationCopy, PreviewFoundationPillList } from "../../video-foundation-ui";
import type { KeyframeGenerationSafety } from "../local-keyframe-generation-types";

export function KeyframeGenerationSafetyPanel({ safety }: { safety: KeyframeGenerationSafety }) {
  return (
    <PreviewFoundationCard title="Safety review">
      <PreviewFoundationCopy>{safety.plainEnglish}</PreviewFoundationCopy>
      <PreviewFoundationPillList items={["still frames only", "local-only", "approval required", "no ComfyUI call", "no queue submit", "no cloud spend"]} />
    </PreviewFoundationCard>
  );
}
