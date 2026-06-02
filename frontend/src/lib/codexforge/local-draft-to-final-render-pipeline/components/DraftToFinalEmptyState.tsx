"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function DraftToFinalEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No reviewed draft selected"
      message="Choose and review a draft later to make the readiness decision concrete. This page only prepares the manual final render handoff."
    />
  );
}
