"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoDraftEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No draft video supplied yet"
      message="If rendering is blocked, keep the copied draft request. After a draft is supplied manually or by an approved boundary, capture it for review."
    />
  );
}
