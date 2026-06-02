"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function KeyframeGenerationSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "keyframes are still frames",
        "nothing runs automatically",
        "request only",
        "no ComfyUI call",
        "capture supplied keyframes only",
      ]}
    />
  );
}
