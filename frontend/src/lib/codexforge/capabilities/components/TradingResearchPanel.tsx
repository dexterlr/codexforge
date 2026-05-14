"use client";

import type { CSSProperties } from "react";

export function TradingResearchPanel() {
  return (
    <section
      data-codexforge-trading-research-panel
      data-codexforge-trading-no-live-orders="trading research says no live orders"
      style={panel}
    >
      <div style={eyebrow}>Trading research</div>
      <h2 style={title}>Research-only market workflow</h2>
      <p style={text}>
        Research-only, no financial advice, no live orders, no broker action, and broker execution blocked.
        Future milestone: paper-trade-only analysis with visible assumptions and risk notes.
      </p>
      <div style={badgeRow}>
        <span style={badge}>research-only</span>
        <span style={badge}>no live orders</span>
        <span style={badge}>paper-trade future</span>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(20,83,45,0.18)", borderRadius: 8, padding: 14, display: "grid", gap: 9 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#bbf7d0" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const text: CSSProperties = { margin: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.86 };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const badge: CSSProperties = { border: "1px solid rgba(187,247,208,0.30)", background: "rgba(187,247,208,0.08)", color: "#bbf7d0", borderRadius: 7, padding: "5px 7px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
