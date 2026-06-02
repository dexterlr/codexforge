"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function GpuJobSchedulerEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No GPU job selected"
      message="Pick a future creative job later. This scheduler only explains queue order, heavy work, and the next safe review step."
    />
  );
}
