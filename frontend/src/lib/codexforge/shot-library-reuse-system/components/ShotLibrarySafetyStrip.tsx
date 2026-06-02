"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ShotLibrarySafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "reusable plan templates",
        "no generation button",
        "no provider calls",
        "no queue mutation",
        "copy-only shot handoff",
      ]}
    />
  );
}
