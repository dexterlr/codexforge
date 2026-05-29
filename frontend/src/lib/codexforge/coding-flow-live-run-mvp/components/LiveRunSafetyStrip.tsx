"use client";
import type { CSSProperties } from "react";
export function LiveRunSafetyStrip() { return <div style={strip} data-codexforge-live-run-safety="LiveRunSafetyStrip renders no auto-apply no auto-run no hidden persistence no Brain mutation preserve latest-message authority"><span>no auto-apply</span><span>no auto-run</span><span>request-ready handoffs only</span><span>preserve latest-message authority</span></div>; }
const strip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, color: "#bae6fd", fontSize: 12, fontWeight: 800 };
