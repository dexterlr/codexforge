"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ComfyUiMetadataEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No metadata supplied yet"
      message="This page can explain the metadata plan before a live local probe exists. No prompt, workflow, queue submit, or render action is available."
    />
  );
}
