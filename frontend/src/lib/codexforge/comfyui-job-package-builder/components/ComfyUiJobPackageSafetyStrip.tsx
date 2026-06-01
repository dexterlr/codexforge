"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ComfyUiJobPackageSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No submit button", "No ComfyUI call", "No auto-run", "Approval required", "Copy package only"]} />;
}
