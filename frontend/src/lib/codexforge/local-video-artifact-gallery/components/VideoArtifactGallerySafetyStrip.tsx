"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoArtifactGallerySafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No file browsing", "No deletion", "No fake playback", "No generation", "Copy handoff only"]} />;
}
