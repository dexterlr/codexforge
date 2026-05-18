"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationHealthReport } from "../index";

export function StabilizationHealthPanel({ health }: { health: StabilizationHealthReport }) {
  return (
    <section style={panel} data-codexforge-stabilization-health-panel="StabilizationHealthPanel renders build health smoke health regression health safety posture">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Health</span>
          <h2 style={heading}>Stabilization health</h2>
          <p style={copy}>Overall level, score, blockers, warnings, and next safe action.</p>
        </div>
        <div style={scoreBox}>
          <span style={scoreLabel}>{health.overallLevel}</span>
          <strong style={score}>{health.score}</strong>
        </div>
      </div>
      <div style={summaryGrid}>
        {health.summary.map((item) => (
          <div key={buildStabilizationStableKey("health-summary", item)} style={summaryItem}>{item}</div>
        ))}
      </div>
      <div style={grid}>
        {health.dimensions.map((dimension) => (
          <article key={buildStabilizationStableKey("health", dimension.id)} style={dimensionCard}>
            <div style={row}>
              <strong style={label}>{dimension.label}</strong>
              <span style={level}>{dimension.level}</span>
            </div>
            <p style={detail}>{dimension.detail}</p>
            <span style={next}>{dimension.nextAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(34,197,94,0.2)", background: "rgba(6,78,59,0.12)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#86efac", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const heading: CSSProperties = { margin: "4px 0", fontSize: 21, letterSpacing: 0, overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
const scoreBox: CSSProperties = { border: "1px solid rgba(34,197,94,0.28)", background: "rgba(34,197,94,0.1)", borderRadius: 8, padding: "9px 12px", display: "grid", gap: 4, minWidth: 110 };
const scoreLabel: CSSProperties = { color: "#bbf7d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
const score: CSSProperties = { color: "#f0fdf4", fontSize: 31, lineHeight: 1 };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8, minWidth: 0 };
const summaryItem: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.3)", borderRadius: 8, padding: 10, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 10, minWidth: 0 };
const dimensionCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start", minWidth: 0 };
const label: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const level: CSSProperties = { color: "#a7f3d0", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const detail: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const next: CSSProperties = { color: "#dcfce7", fontSize: 12, fontWeight: 800, overflowWrap: "anywhere" };
