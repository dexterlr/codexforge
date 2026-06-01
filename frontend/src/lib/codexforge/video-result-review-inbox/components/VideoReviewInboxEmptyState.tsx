"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoReviewInboxEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No video results yet"
      message="Future drafts will appear here for keep, retry, compare, upscale, interpolate, recovery, or final-candidate review."
    />
  );
}
