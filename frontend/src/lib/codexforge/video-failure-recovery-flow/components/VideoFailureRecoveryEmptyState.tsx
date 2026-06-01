"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoFailureRecoveryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No failure selected"
      message="When a future render fails or looks wrong, choose the closest case and follow a safe manual next step."
    />
  );
}
