"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function RenderVersionHistoryEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No live render timeline"
      message="Version records are deterministic preview data until supplied artifacts and approved persistence are connected."
    />
  );
}
