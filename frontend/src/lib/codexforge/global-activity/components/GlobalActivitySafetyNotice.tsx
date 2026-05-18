"use client";

import type { CSSProperties } from "react";

export function GlobalActivitySafetyNotice() {
  const items = [
    "read-only",
    "no command execution without approval",
    "no file writes without approval",
    "no graph mutation",
    "evidence is context, not proof",
    "preserve latest-message authority",
    "no auto-persistence",
    "broker-execution is blocked-policy text only",
  ];
  return (
    <section style={notice} data-codexforge-global-activity-safety-notice="GlobalActivitySafetyNotice renders read-only no command execution without approval no file writes without approval no graph mutation evidence is context, not proof preserve latest-message authority no auto-persistence broker-execution blocked-policy text">
      <strong style={title}>Safety boundary</strong>
      <div style={grid}>
        {items.map((item) => (
          <span key={item} style={pill}>{item}</span>
        ))}
      </div>
    </section>
  );
}

const notice: CSSProperties = { border: "1px solid rgba(251,191,36,0.26)", background: "linear-gradient(135deg, rgba(120,53,15,0.2), rgba(2,6,23,0.68))", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { color: "#fde68a", fontSize: 13, letterSpacing: 0 };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.08)", borderRadius: 8, color: "#fef3c7", fontSize: 12, fontWeight: 850, lineHeight: 1.35, padding: "7px 9px", overflowWrap: "anywhere" };
