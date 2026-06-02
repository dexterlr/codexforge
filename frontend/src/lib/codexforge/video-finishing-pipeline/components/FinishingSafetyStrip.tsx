"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function FinishingSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Final polish planning",
        "No render button",
        "No export button",
        "Approval required",
        "Local-first posture",
      ]}
    />
  );
}
