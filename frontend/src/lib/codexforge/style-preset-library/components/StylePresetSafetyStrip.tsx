"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function StylePresetSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "deterministic local definitions",
        "no provider calls",
        "no image/video generation",
        "style presets are suggestions",
        "copy-only style handoff",
      ]}
    />
  );
}
