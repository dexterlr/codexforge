"use client";
import type { CSSProperties } from "react";
export function LocalProviderProbeSafetyStrip() { return <section style={strip}><strong>Preview only</strong><span>No live calls run here. A local server means software on this workstation, usually reached through localhost.</span></section>; }
const strip: CSSProperties = { border: "1px solid rgba(251,191,36,0.28)", borderRadius: 8, background: "rgba(120,53,15,0.18)", color: "#fde68a", display: "grid", gap: 4, padding: 12, fontSize: 13 };
