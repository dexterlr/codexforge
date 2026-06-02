"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function GpuJobSchedulerSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={[
        "Preview schedule only",
        "No start job button",
        "No system command",
        "No ComfyUI call",
        "No queue mutation",
      ]}
    />
  );
}
