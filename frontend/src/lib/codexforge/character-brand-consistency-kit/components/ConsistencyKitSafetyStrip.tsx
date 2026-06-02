"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ConsistencyKitSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "notes are planning aids",
        "no upload requirement",
        "no face identity claims",
        "no provider calls",
        "copy-only consistency handoff",
      ]}
    />
  );
}
