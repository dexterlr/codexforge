"use client";
import type { CSSProperties } from "react";
export function SafeEnvKeyDetectionEmptyState() { return <section style={empty}><strong>No check has run</strong><span>That is expected. This phase is readiness design and placeholder guidance, not a secret scanner.</span></section>; }
const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.28)", borderRadius: 8, color: "#cbd5e1", display: "grid", gap: 4, padding: 12, fontSize: 13 };
