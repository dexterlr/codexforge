"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function UpscaleWorkflowEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No source draft connected"
      message="Add a reviewed draft later to turn this placeholder into a real upscale plan. Until then, this page explains the safe sequence and does not process video."
    />
  );
}
