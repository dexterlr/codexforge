"use client";

import type { CSSProperties } from "react";

const ITEMS = ["no auto-apply", "no auto-run", "approval required", "preview first", "preserve latest-message authority"] as const;

export function CodingFlowSafetyStrip() {
  return (
    <div style={strip} data-codexforge-coding-flow-safety-strip="CodingFlowSafetyStrip renders no auto-apply no auto-run approval required preview first preserve latest-message authority no direct run-command no direct write-file no direct apply-diff no broker-execution call except blocked-policy text">
      {ITEMS.map((item) => <span key={`coding-flow-safety-${item}`} style={pill}>{item}</span>)}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, padding: "6px 8px" };
