"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function ComfyUiWorkflowImportSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["Preview only", "Raw JSON secondary", "No ComfyUI call", "No asset download", "No prompt sent"]} />;
}
