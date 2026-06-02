"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoProjectWorkspaceEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No saved project state yet"
      message="Use this preview to understand what belongs together. Add approved project persistence later before saving real project records."
    />
  );
}
