"use client";

import type { CSSProperties } from "react";

export function ApprovedPatchApplySafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-approved-patch-apply-safety-notice="ApprovedPatchApplySafetyNotice renders approval required no command execution no direct apply-diff from UI no file writes without approval no auto-persistence preserve latest-message authority"
    >
      <strong>Approved Patch Apply safety notice</strong>
      <p>
        Approval required. No command execution. No direct apply-diff from UI. No file writes without approval.
        No auto-persistence. Preserve latest-message authority.
      </p>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(14,165,233,0.08)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "grid",
  fontSize: 12,
  gap: 4,
  lineHeight: 1.45,
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: 10,
};
