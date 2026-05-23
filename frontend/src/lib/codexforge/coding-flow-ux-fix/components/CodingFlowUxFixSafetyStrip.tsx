"use client";

import type { CSSProperties } from "react";

const BADGES = ["Review first", "Approval required", "No auto-run", "No auto-apply", "preserve latest-message authority"] as const;

export function CodingFlowUxFixSafetyStrip() {
  return (
    <div style={strip} data-codexforge-coding-flow-ux-fix-safety-strip="CodingFlowUxFixSafetyStrip renders no auto-apply no auto-run approval required preserve latest-message authority compact safety strip">
      {BADGES.map((badge) => <span key={`coding-flow-ux-safety-${badge}`} style={badgeStyle}>{badge}</span>)}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const badgeStyle: CSSProperties = { border: "1px solid rgba(45,212,191,0.32)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "5px 7px" };
