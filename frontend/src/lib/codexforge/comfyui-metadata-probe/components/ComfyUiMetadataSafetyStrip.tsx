"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ComfyUiMetadataSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={["Metadata only", "Local-only plan", "No prompt sent", "No workflow submit", "No queue mutation", "No render job"]}
    />
  );
}
