"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function DualGpuWorkerSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "No hardware command",
        "No job launch",
        "No automatic GPU selection",
        "No combined VRAM assumption",
        "Review assignment first",
      ]}
    />
  );
}
