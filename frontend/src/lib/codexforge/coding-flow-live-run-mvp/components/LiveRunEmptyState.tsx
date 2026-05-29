"use client";
import type { CSSProperties } from "react";
export function LiveRunEmptyState() { return <section style={panel} data-codexforge-live-run-empty="LiveRunEmptyState renders Empty states explain next action"><h2 style={title}>Start live run</h2><p style={copy}>Follow one safe path from file to validation result.</p></section>; }
const panel: CSSProperties = { border: "1px dashed rgba(125,211,252,0.28)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.55)" };
const title: CSSProperties = { fontSize: 18, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "8px 0 0" };
