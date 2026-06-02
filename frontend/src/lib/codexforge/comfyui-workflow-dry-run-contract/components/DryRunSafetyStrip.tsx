"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function DryRunSafetyStrip() {
  return (
    <PreviewFoundationSafetyStrip
      items={["Dry run only", "Review and simulation", "No workflow run", "No queue submit", "No render", "Approval required"]}
    />
  );
}
