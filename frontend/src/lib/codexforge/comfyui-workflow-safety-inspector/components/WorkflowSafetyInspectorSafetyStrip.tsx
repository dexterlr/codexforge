"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function WorkflowSafetyInspectorSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No render button", "No workflow run", "Approval required", "Plain English risk labels", "Preview only"]} />;
}
