"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function LiveHealthProbeEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No live health probe yet"
      message="This gate is ready for review, but no probe button is shown. A future probe still needs explicit approval and a guarded local bridge."
    />
  );
}
