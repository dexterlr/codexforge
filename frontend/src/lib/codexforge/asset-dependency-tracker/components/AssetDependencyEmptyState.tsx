"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function AssetDependencyEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No live asset scan"
      message="This tracker uses deterministic preview dependencies and supplied notes. Add an approved asset persistence boundary later before storing real project state."
    />
  );
}
