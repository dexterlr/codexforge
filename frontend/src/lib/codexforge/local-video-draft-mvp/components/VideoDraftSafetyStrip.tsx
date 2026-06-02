"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoDraftSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "no render button",
        "draft request only",
        "dry run reviewed",
        "submit boundary reviewed",
        "capture supplied draft only",
      ]}
    />
  );
}
