"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function WorkflowSafetyInspectorEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No workflow safety result yet"
      message="Import a workflow summary first, then use this screen to review unknown nodes, assets, resources, and output paths before any future render."
    />
  );
}
