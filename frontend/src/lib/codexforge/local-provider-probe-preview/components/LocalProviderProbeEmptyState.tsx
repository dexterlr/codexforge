"use client";
import type { CSSProperties } from "react";
export function LocalProviderProbeEmptyState() { return <section style={empty}><strong>No live probe result</strong><span>That is intentional. This page explains what a safe health check would mean before any approved live route exists.</span></section>; }
const empty: CSSProperties = { border: "1px dashed rgba(148,163,184,0.28)", borderRadius: 8, color: "#cbd5e1", display: "grid", gap: 4, padding: 12, fontSize: 13 };
