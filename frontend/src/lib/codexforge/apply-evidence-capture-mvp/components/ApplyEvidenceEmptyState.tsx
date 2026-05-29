"use client";
import type { CSSProperties } from "react";
export function ApplyEvidenceEmptyState() { return <section style={panel} data-codexforge-apply-evidence-empty="ApplyEvidenceEmptyState renders"><h2 style={title}>Capture apply evidence</h2><p style={copy}>Copy evidence after reviewing request, policy, approval, boundary, rollback, and validation handoff.</p></section>; }
const panel: CSSProperties = { border: "1px dashed rgba(125,211,252,0.28)", borderRadius: 8, padding: 14, background: "rgba(2,6,23,0.55)" };
const title: CSSProperties = { fontSize: 18, margin: 0, whiteSpace: "nowrap" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: "8px 0 0" };
