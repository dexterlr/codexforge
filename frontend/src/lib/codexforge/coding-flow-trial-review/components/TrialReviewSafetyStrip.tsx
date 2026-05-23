"use client";

import type { CSSProperties } from "react";

const ITEMS = ["no auto-apply", "no auto-run", "approval required", "preserve latest-message authority"] as const;

export function TrialReviewSafetyStrip() {
  return (
    <div style={strip} data-codexforge-trial-review-safety-strip="TrialReviewSafetyStrip renders no auto-apply no auto-run approval required preserve latest-message authority no direct write-file UI no direct run-command UI">
      {ITEMS.map((item) => <span key={`trial-review-safety-${item}`} style={pill}>{item}</span>)}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px" };
