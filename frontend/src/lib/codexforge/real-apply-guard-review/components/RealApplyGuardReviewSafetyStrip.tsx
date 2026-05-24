"use client";

import type { CSSProperties } from "react";

export function RealApplyGuardReviewSafetyStrip() {
  return (
    <div style={strip} data-codexforge-real-apply-guard-review-safety-strip="RealApplyGuardReviewSafetyStrip renders no auto-apply no auto-run approval required rollback executionAllowed false no execution in this phase preserve latest-message authority no unsafe execution buttons">
      {["no auto-apply", "no auto-run", "approval required", "rollback required", "executionAllowed false", "preserve latest-message authority"].map((item) => (
        <span key={`real-apply-guard-review-safety-${item}`} style={pill}>{item}</span>
      ))}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "5px 7px" };
