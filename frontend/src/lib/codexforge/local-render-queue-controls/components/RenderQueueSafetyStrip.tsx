"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function RenderQueueSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Preview-only controls",
        "No start/render button",
        "No destructive buttons",
        "No queue mutation",
        "Review before run",
      ]}
    />
  );
}
