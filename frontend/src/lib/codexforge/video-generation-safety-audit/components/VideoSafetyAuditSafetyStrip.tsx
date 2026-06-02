"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoSafetyAuditSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Safety audit only",
        "No generation button",
        "No provider calls",
        "No queue submit",
        "Approval required",
      ]}
    />
  );
}
