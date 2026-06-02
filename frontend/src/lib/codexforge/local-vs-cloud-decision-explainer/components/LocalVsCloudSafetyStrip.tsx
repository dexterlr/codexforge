"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function LocalVsCloudSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Local saves money",
        "Cloud is optional fallback",
        "No provider call",
        "No generate button",
        "Copy decision only",
      ]}
    />
  );
}
