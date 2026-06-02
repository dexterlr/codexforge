"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function InterpolationEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No motion review connected"
      message="Connect a reviewed draft later to choose an FPS target. Until then, this page explains motion smoothing safely and does not create frames."
    />
  );
}
