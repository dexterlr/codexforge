"use client";

import type { CSSProperties } from "react";

export function StabilizationSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-stabilization-safety-notice="StabilizationSafetyNotice renders no auto-fix no auto-rollback no command execution without approval no file writes without approval Safe Patch Preview Preview Diff Composer evidence is context, not proof preserve latest-message authority"
    >
      <strong style={title}>Safety boundary</strong>
      <div style={grid}>
        {[
          "no auto-fix",
          "no auto-rollback",
          "no command execution without approval",
          "no file writes without approval",
          "Safe Patch Preview required for edits",
          "Preview Diff Composer before apply",
          "evidence is context, not proof",
          "preserve latest-message authority",
        ].map((item) => (
          <span key={item} style={pill}>{item}</span>
        ))}
      </div>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.26)",
  background: "linear-gradient(135deg, rgba(120,53,15,0.22), rgba(2,6,23,0.62))",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 10,
  minWidth: 0,
};
const title: CSSProperties = { color: "#fde68a", fontSize: 13, letterSpacing: 0, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = {
  border: "1px solid rgba(251,191,36,0.22)",
  background: "rgba(251,191,36,0.08)",
  borderRadius: 8,
  color: "#fef3c7",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.35,
  padding: "7px 9px",
  overflowWrap: "anywhere",
};
