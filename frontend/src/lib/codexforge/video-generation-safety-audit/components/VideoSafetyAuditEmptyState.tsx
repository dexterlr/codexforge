"use client";

import { PreviewFoundationEmptyState } from "../../video-foundation-ui";

export function VideoSafetyAuditEmptyState() {
  return (
    <PreviewFoundationEmptyState
      title="No real trial is running"
      message="The audit checks readiness for a future real trial. It does not call ComfyUI, mutate render queues, upload assets, or generate video."
    />
  );
}
