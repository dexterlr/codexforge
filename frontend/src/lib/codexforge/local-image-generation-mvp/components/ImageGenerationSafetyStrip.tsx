"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ImageGenerationSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "nothing runs automatically",
        "request only",
        "approval boundary visible",
        "no ComfyUI call",
        "supplied result capture only",
      ]}
    />
  );
}
