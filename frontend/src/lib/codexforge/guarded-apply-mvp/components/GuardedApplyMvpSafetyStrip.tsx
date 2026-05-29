"use client";

import type { CSSProperties } from "react";

export function GuardedApplyMvpSafetyStrip() {
  return (
    <div style={strip} data-codexforge-guarded-apply-mvp-safety="GuardedApplyMvpSafetyStrip renders no auto-apply no auto-run approval required preserve latest-message authority no unsafe execution buttons">
      <span>no auto-apply</span>
      <span>no auto-run</span>
      <span>approval required</span>
      <span>preserve latest-message authority</span>
    </div>
  );
}

const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#bae6fd", fontSize: 12, fontWeight: 800 };
