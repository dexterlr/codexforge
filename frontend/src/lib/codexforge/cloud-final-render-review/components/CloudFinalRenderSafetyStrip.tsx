"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function CloudFinalRenderSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Future/manual/approved only",
        "No upload button",
        "No API call",
        "No generate button",
        "Copy handoff only",
      ]}
    />
  );
}
