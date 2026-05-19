"use client";

import type { CSSProperties } from "react";

export function ApprovedPatchApplyEmptyState({ reason = "Prepare apply request after a preview diff is visible." }: { reason?: string }) {
  return (
    <section
      style={empty}
      data-codexforge-approved-patch-apply-empty-state="ApprovedPatchApplyEmptyState renders request-ready blocked no auto-apply no command execution"
    >
      <strong>Approved apply not prepared</strong>
      <span>{reason}</span>
    </section>
  );
}

const empty: CSSProperties = {
  border: "1px dashed rgba(148,163,184,0.28)",
  background: "rgba(15,23,42,0.46)",
  borderRadius: 8,
  color: "#cbd5e1",
  display: "grid",
  fontSize: 12,
  gap: 4,
  lineHeight: 1.45,
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: 12,
};
