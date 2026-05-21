"use client";

import type { CSSProperties } from "react";

const ITEMS = ["no auto-apply", "no auto-run", "approval required", "rollback visible", "preserve latest-message authority"] as const;

export function ApplyValidationSafetyStrip() {
  return (
    <div style={strip} data-codexforge-apply-validation-safety-strip="ApplyValidationSafetyStrip renders no auto-apply no auto-run approval required rollback preserve latest-message authority">
      {ITEMS.map((item) => (
        <span key={`apply-validation-safety-${item}`} style={pill}>{item}</span>
      ))}
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const pill: CSSProperties = { background: "rgba(20,184,166,0.11)", border: "1px solid rgba(45,212,191,0.28)", borderRadius: 8, color: "#ccfbf1", fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "6px 8px" };
