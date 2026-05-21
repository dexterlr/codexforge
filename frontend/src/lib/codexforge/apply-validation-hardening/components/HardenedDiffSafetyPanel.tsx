"use client";

import type { CSSProperties } from "react";
import type { HardenedDiffSafety } from "../index";

export function HardenedDiffSafetyPanel({ safety }: { safety: HardenedDiffSafety }) {
  return (
    <section style={panel} data-codexforge-hardened-diff-safety-panel="HardenedDiffSafetyPanel renders diff safety checks path traversal binary patch secrets in diff mojibake">
      <div style={header}><span style={eyebrow}>Diff safety</span><strong>{safety.overallStatus}</strong></div>
      <h2 style={title}>Reviewable diff checks</h2>
      <p style={copy}>{safety.summary[1]}</p>
      <div style={checkGrid}>
        {safety.checks.slice(0, 6).map((check) => <span key={`diff-safety-${check.id}`} style={pill}>{check.label}: {check.status}</span>)}
      </div>
      <details style={details}>
        <summary>All diff checks</summary>
        <ul style={list}>{safety.checks.map((check) => <li key={`diff-safety-detail-${check.id}`}>{check.label}: {check.detail}</li>)}</ul>
      </details>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const checkGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const pill: CSSProperties = { background: "rgba(2,6,23,0.4)", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 800, padding: "6px 7px" };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const list: CSSProperties = { margin: "8px 0 0", paddingLeft: 18 };
