"use client";

import type { CSSProperties } from "react";

export function RegressionTriageSafetyNotice() {
  return (
    <div
      data-codexforge-regression-triage-safety="RegressionTriageSafetyNotice renders no auto-fix no auto-rollback Safe Patch Preview evidence is context, not proof preserve latest-message authority"
      style={notice}
    >
      Regression Triage is review-only: no auto-fix, no auto-rollback, no file writes, no command execution, and no
      Brain graph mutation. Evidence is context, not proof. Use Safe Patch Preview, verify current files, and preserve
      latest-message authority.
    </div>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.30)",
  background: "rgba(251,191,36,0.10)",
  borderRadius: 8,
  color: "#fef3c7",
  fontSize: 12,
  fontWeight: 800,
  lineHeight: 1.5,
  padding: 10,
  overflowWrap: "anywhere",
};
