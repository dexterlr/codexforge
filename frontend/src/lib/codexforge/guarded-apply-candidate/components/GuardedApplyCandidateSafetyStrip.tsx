"use client";

import type { CSSProperties } from "react";

export function GuardedApplyCandidateSafetyStrip() {
  const items = ["one file", "one diff", "one approval", "no auto-apply", "no auto-run", "preserve latest-message authority", "execution allowed false"];
  return (
    <div style={strip} data-codexforge-guarded-apply-candidate-safety-strip="GuardedApplyCandidateSafetyStrip renders one file one diff one approval no auto-apply no auto-run execution allowed false preserve latest-message authority">
      {items.map((item) => <span key={`guarded-apply-safety-${item}`} style={pill}>{item}</span>)}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const pill: CSSProperties = { background: "rgba(20,184,166,0.12)", border: "1px solid rgba(94,234,212,0.28)", borderRadius: 999, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "5px 8px" };
