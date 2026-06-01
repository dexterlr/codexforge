"use client";

import { PreviewFoundationSafetyStrip } from "../../video-foundation-ui";

export function VideoReviewInboxSafetyStrip() {
  return <PreviewFoundationSafetyStrip items={["No render button", "No delete button", "No fake results", "Copy review note", "Manual decisions"]} />;
}
