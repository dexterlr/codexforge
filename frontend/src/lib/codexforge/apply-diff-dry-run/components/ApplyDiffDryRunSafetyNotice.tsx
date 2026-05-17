"use client";

import type { CSSProperties } from "react";

export function ApplyDiffDryRunSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-apply-diff-dry-run-safety="simulation only no mutation actual apply-diff remains blocked pseudo diff alone is not applyable current file verification required rollback plan required preserve latest-message authority"
    >
      <strong>Simulation only</strong>
      <span>
        No mutation, no file writes, no commands, no real apply-diff call, no broker-execution, and no Brain graph
        mutation. Pseudo diff alone is not applyable, current file verification required, rollback plan required, and
        preserve latest-message authority.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.22)",
  background: "rgba(251,191,36,0.1)",
  borderRadius: 8,
  color: "#fef3c7",
  display: "grid",
  gap: 4,
  fontSize: 12,
  lineHeight: 1.45,
  padding: 12,
  overflowWrap: "anywhere",
};
