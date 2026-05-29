"use client";
import type { CSSProperties } from "react";
export function ValidationResultEmptyState() { return <section style={panel} data-codexforge-validation-result-empty="ValidationResultEmptyState renders Paste validation output to review the result."><h2 style={title}>Paste validation output to review the result.</h2><p style={copy}>Commands are recorded manually. This screen never runs them.</p></section>; }
const panel: CSSProperties = { border: "1px dashed rgba(125,211,252,0.28)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.55)" };
const title: CSSProperties = { fontSize: 18, margin: 0 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "8px 0 0" };
