"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function CloudVideoProviderSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Local-first default",
        "No provider is called",
        "No credits are spent",
        "No API key fields",
        "No run button",
        "Copy provider handoff only",
      ]}
    />
  );
}
