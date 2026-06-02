"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function InterpolationSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Planning only",
        "No frames are created",
        "Approval required",
        "Local GPU/time posture",
        "No frame interpolation execution",
      ]}
    />
  );
}
