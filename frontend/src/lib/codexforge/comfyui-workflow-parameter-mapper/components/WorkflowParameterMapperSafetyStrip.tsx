"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function WorkflowParameterMapperSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No workflow mutation", "No run button", "Copy plan only", "Safe editable labels", "Beginner explanations"]} />;
}
