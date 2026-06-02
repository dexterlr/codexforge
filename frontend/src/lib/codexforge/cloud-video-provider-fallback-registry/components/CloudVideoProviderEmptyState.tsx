"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function CloudVideoProviderEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No active cloud integration"
      message="This registry is useful even with no connected provider because it explains when cloud fallback might be worth reviewing later."
    />
  );
}
