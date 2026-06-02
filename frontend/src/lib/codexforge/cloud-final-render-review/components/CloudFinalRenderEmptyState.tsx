"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function CloudFinalRenderEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No cloud render is queued"
      message="A cloud final render is not started here. The page only explains what must be reviewed before a future manual cloud step."
    />
  );
}
