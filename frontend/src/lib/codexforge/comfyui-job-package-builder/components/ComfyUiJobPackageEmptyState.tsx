"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ComfyUiJobPackageEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No job package submitted"
      message="A package can be reviewed and copied here, but real local rendering remains a future approval-gated step."
    />
  );
}
