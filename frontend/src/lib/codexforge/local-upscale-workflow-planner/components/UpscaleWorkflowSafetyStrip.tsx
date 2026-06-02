"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function UpscaleWorkflowSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Planning only",
        "No video is changed yet",
        "Local-first posture",
        "Approval required",
        "No upscale execution",
      ]}
    />
  );
}
