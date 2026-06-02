"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoProjectWorkspaceSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["Preview project only", "No generate button", "No export button", "No hidden persistence", "Copy handoff only"]} />;
}
