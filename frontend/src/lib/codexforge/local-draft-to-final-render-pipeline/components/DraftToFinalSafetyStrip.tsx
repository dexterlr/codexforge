"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function DraftToFinalSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Future approved execution only",
        "No final render button",
        "No ComfyUI call",
        "No cloud provider call",
        "No video generation",
      ]}
    />
  );
}
