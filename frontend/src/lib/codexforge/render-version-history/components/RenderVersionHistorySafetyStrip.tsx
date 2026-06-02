"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function RenderVersionHistorySafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No playback", "No file deletion", "No generation", "No export", "Copy version handoff only"]} />;
}
