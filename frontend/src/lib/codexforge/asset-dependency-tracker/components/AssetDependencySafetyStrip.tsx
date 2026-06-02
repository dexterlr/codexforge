"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function AssetDependencySafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No file browser", "No delete button", "No arbitrary path access", "No generation", "Copy checklist only"]} />;
}
