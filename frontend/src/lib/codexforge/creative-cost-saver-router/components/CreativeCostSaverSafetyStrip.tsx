"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function CreativeCostSaverSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "No cloud credits spent",
        "No provider calls",
        "No render button",
        "No ComfyUI call",
        "No local job run",
      ]}
    />
  );
}
