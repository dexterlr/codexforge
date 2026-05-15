"use client";

import type { CSSProperties } from "react";

export function PatchPreviewQueueSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-patch-preview-queue-safety="PatchPreviewQueueSafetyNotice renders Safe Patch Preview preview diff only evidence is context, not proof verify current files no file writes without approval no command execution without approval preserve latest-message authority"
    >
      <strong>Safe Patch Preview only</strong>
      <span>
        Queue items produce preview diff only. Evidence is context, not proof. Verify current files, preserve
        latest-message authority, and require explicit approval before any future file write or command execution.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(94,234,212,0.24)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 5,
  color: "#ccfbf1",
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
};
