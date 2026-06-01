"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoFailureRecoverySafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No automatic retry", "No run button", "Copy retry plan", "No workflow mutation", "Review first"]} />;
}
