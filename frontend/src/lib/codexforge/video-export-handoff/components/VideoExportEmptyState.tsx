"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoExportEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No exported video"
      message="This page prepares a handoff packet only. A real export must be approved and run somewhere else later."
    />
  );
}
