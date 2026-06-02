"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function RenderQueueEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="Queue is preview-only"
      message="When no item is selected, the safest next step is to review the scheduler and worker strategy before any future local render job exists."
    />
  );
}
