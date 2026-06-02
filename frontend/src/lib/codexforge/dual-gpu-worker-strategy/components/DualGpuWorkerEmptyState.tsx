"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function DualGpuWorkerEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No worker assignment selected"
      message="Choose a future job later. This page only explains how two GPUs can be reviewed as separate local workers."
    />
  );
}
