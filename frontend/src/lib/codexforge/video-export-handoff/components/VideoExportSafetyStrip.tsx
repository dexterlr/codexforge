"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoExportSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No export button", "No file write", "No upload", "No provider calls", "Copy packet only"]} />;
}
