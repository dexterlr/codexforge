"use client";

import type { CSSProperties } from "react";

export function RegressionFixQueueSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-regression-fix-queue-safety="RegressionFixQueueSafetyNotice renders no auto-fix no auto-rollback Safe Patch Preview Preview Diff Composer evidence is context, not proof preserve latest-message authority"
    >
      <strong>Regression Fix Queue is review-only</strong>
      <span>
        No auto-fix, no auto-rollback, no file writes, no command execution, and no Brain graph mutation. Evidence is
        context, not proof. Verify current files, preserve latest-message authority, then route preview-only handoff
        through Safe Patch Preview and Preview Diff Composer.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(94,234,212,0.24)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
  overflowWrap: "anywhere",
  padding: 12,
};
