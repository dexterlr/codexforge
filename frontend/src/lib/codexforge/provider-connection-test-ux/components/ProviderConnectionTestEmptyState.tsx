"use client";
import type { CSSProperties } from "react";
export function ProviderConnectionTestEmptyState() { return <section style={empty}><strong>No tests have run</strong><span>That is the safe state for this phase. Review readiness first, then add approved live checks later.</span></section>; }
const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.28)", borderRadius: 8, color: "#cbd5e1", display: "grid", gap: 4, padding: 12, fontSize: 13 };
