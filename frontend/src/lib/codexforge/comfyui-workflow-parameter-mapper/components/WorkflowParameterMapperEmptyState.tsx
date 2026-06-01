"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function WorkflowParameterMapperEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No workflow parameters mapped yet"
      message="Import and inspect a workflow first. This page shows how technical node values will become safe choices later."
    />
  );
}
