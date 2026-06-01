"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoDraftComparisonSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No fake playback", "No file reading", "No render button", "Copy comparison only", "Manual selection"]} />;
}
