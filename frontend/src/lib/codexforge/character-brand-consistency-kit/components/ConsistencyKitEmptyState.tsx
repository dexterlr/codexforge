"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ConsistencyKitEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No approved consistency kit yet"
      message="Draft notes are still useful. Review them before reuse, and keep them as planning data unless a future approved persistence flow exists."
    />
  );
}
