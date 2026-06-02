"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ImageGenerationEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No image output yet"
      message="If generation is blocked, keep the copied request and wait for an approved local executor. After a result is supplied, capture the artifact metadata for review."
    />
  );
}
