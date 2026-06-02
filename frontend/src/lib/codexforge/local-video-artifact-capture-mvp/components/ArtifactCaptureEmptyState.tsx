"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ArtifactCaptureEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No trusted artifact file opened"
      message="Use supplied metadata from a manual result or approved boundary. If metadata is missing, leave capture blocked and do not invent an output."
    />
  );
}
