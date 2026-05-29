"use client";
import type { CSSProperties } from "react";
export function ValidationResultSafetyStrip() { return <div style={strip} data-codexforge-validation-result-safety="ValidationResultSafetyStrip renders no auto-run no command execution no fabricated output preserve latest-message authority"><span>no auto-run</span><span>manual paste</span><span>copy result only</span><span>preserve latest-message authority</span></div>; }
const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#bae6fd", fontSize: 12, fontWeight: 800 };
