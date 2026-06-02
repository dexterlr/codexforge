"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function CreativePromptMemorySafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "reviewed memory candidates only",
        "no auto-save button",
        "nothing is secretly sent to an AI provider",
        "nothing is secretly written into memory",
        "copy-only handoff",
      ]}
    />
  );
}
