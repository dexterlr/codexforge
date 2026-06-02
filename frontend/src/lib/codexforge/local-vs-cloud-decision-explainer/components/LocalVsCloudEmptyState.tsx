"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function LocalVsCloudEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No route is executed"
      message="The explainer only describes the safest route. It does not submit prompts, upload assets, spend credits, or start generation."
    />
  );
}
