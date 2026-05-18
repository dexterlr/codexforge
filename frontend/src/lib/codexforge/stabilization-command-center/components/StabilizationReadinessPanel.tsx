"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationReadiness } from "../index";

export function StabilizationReadinessPanel({ readiness }: { readiness: StabilizationReadiness }) {
  return (
    <section style={panel} data-codexforge-stabilization-readiness-panel="StabilizationReadinessPanel renders mutation tools blocked unless explicit approval">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Readiness</span>
          <h2 style={heading}>Manual review checklist</h2>
        </div>
        <span style={badge}>{readiness.score}</span>
      </div>
      <div style={grid}>
        {readiness.checks.map((check) => (
          <article key={buildStabilizationStableKey("readiness", check.id)} style={checkStyle}>
            <div style={row}>
              <strong style={label}>{check.label}</strong>
              <span style={status}>{check.status}</span>
            </div>
            <p style={detail}>{check.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(167,139,250,0.2)", background: "rgba(76,29,149,0.12)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(167,139,250,0.28)", background: "rgba(167,139,250,0.1)", borderRadius: 8, color: "#ede9fe", fontSize: 22, fontWeight: 900, padding: "6px 10px" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const checkStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" };
const label: CSSProperties = { overflowWrap: "anywhere" };
const status: CSSProperties = { color: "#ddd6fe", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const detail: CSSProperties = { margin: 0, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
