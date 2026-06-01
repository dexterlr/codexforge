"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function ComfyUiWorkflowImportEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No workflow imported yet"
      message="Paste notes or choose a future workflow source later. For now, this page explains what import preview will show before anything runs."
    />
  );
}
