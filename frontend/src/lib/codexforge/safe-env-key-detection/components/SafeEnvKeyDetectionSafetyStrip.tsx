"use client";
import type { CSSProperties } from "react";
export function SafeEnvKeyDetectionSafetyStrip() { return <section style={strip}><strong>Safe key detection</strong><span>This UI never reads or prints secret values. Future server checks must return booleans only.</span></section>; }
const strip: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", borderRadius: 8, background: "rgba(120,53,15,0.18)", color: "#fde68a", display: "grid", gap: 4, padding: 12, fontSize: 13 };
