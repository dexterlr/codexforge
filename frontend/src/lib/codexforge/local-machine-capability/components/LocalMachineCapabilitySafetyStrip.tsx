"use client";

import type { CSSProperties } from "react";

export function LocalMachineCapabilitySafetyStrip() {
  return <section style={strip}><strong>Safety boundary</strong><span>Manual profile only. No browser hardware scan, no system commands, no live provider calls, and no prompts sent to models.</span></section>;
}
const strip: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", borderRadius: 8, background: "rgba(120,53,15,0.18)", color: "#fde68a", display: "grid", gap: 4, padding: 12, fontSize: 13 };
