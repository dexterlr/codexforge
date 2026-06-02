"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ArtifactCaptureSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "metadata-only capture",
        "no file delete button",
        "no render button",
        "no hidden persistence",
        "copy artifact handoff allowed",
      ]}
    />
  );
}
