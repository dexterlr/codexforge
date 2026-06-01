"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoDraftComparisonEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No drafts to compare yet"
      message="Future drafts will appear here for prompt, workflow, keyframe, quality, artifact, cost, and next-action comparison."
    />
  );
}
