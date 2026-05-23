"use client";

import type { CSSProperties } from "react";

const ITEMS = ["no auto-apply", "no auto-run", "approval required", "preserve latest-message authority"] as const;

export function LiveTrialSafetyStrip() {
  return (
    <div style={strip} data-codexforge-live-trial-safety-strip="LiveTrialSafetyStrip renders no auto-apply no auto-run approval required preserve latest-message authority no direct run-command no direct write-file no direct apply-diff">
      {ITEMS.map((item) => <span key={`live-trial-safety-${item}`} style={pill}>{item}</span>)}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px" };
