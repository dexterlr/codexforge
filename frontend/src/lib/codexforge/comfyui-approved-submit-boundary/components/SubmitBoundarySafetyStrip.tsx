"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function SubmitBoundarySafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={["Boundary prepared", "Execution blocked", "Approval required", "No submit button", "No queue submit", "Local-only"]}
    />
  );
}
