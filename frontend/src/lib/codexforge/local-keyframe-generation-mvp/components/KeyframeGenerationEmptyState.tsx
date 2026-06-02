"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function KeyframeGenerationEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No keyframes supplied yet"
      message="If generation is blocked, keep the copied keyframe request. After keyframes are supplied manually or by an approved boundary, capture them for review."
    />
  );
}
