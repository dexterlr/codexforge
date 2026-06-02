"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function FinishingEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No final candidate selected"
      message="Select and review a draft later to make this finishing checklist concrete. This page only explains the safe final polish path."
    />
  );
}
