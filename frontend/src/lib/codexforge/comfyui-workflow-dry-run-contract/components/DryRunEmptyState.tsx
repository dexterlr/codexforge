"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function DryRunEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No workflow dry run executed"
      message="The contract explains what a dry run would review. No workflow runs, no queue changes, and no ComfyUI submit action is available."
    />
  );
}
