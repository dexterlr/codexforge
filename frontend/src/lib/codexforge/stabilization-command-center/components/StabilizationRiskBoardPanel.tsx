"use client";

import type { CSSProperties } from "react";
import { buildStabilizationStableKey, type StabilizationRiskBoard } from "../index";

export function StabilizationRiskBoardPanel({ board }: { board: StabilizationRiskBoard }) {
  return (
    <section style={panel} data-codexforge-stabilization-risk-board-panel="StabilizationRiskBoardPanel renders latest-message-authority-risk">
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Risk board</span>
          <h2 style={heading}>Stabilization risks</h2>
        </div>
        <span style={badge}>{board.blockerCount} blockers</span>
      </div>
      <div style={grid}>
        {board.items.map((item) => (
          <article key={buildStabilizationStableKey("risk", item.id)} style={itemStyle}>
            <div style={row}>
              <strong style={title}>{item.title}</strong>
              <span style={severity}>{item.severity}</span>
            </div>
            <span style={category}>{item.category}</span>
            <p style={detail}>{item.mitigation}</p>
            <div style={flags}>
              <span>Safe Patch Preview required: {item.safePatchPreviewRequired ? "yes" : "no"}</span>
              <span>Verification required: {item.verificationRequired ? "yes" : "no"}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(248,113,113,0.2)", background: "rgba(127,29,29,0.12)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const top: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start", flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: "4px 0 0", fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const badge: CSSProperties = { border: "1px solid rgba(248,113,113,0.28)", background: "rgba(248,113,113,0.1)", borderRadius: 8, color: "#fee2e2", fontSize: 11, fontWeight: 900, padding: "6px 8px", textTransform: "uppercase" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 10, minWidth: 0 };
const itemStyle: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.38)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" };
const title: CSSProperties = { overflowWrap: "anywhere" };
const severity: CSSProperties = { color: "#fecaca", fontSize: 10, fontWeight: 900, textTransform: "uppercase", whiteSpace: "nowrap" };
const category: CSSProperties = { color: "#fca5a5", fontSize: 11, fontWeight: 850, overflowWrap: "anywhere" };
const detail: CSSProperties = { margin: 0, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const flags: CSSProperties = { display: "grid", gap: 4, color: "#fee2e2", fontSize: 11, overflowWrap: "anywhere" };
