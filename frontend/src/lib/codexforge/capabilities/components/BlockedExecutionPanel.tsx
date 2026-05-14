"use client";

import type { CSSProperties } from "react";

export function BlockedExecutionPanel() {
  return (
    <section
      data-codexforge-blocked-execution-panel
      data-codexforge-broker-blocked="true"
      style={panel}
    >
      <div style={eyebrow}>Blocked execution</div>
      <h2 style={title}>Broker execution is visibly blocked</h2>
      <p style={text}>
        No live orders, no account mutation, no broker action, and no execution unlock from this cockpit.
        The future milestone is paper-trade-only research with risk caps before any live integration is considered.
      </p>
      <div style={badgeRow}>
        <span style={badge}>blocked</span>
        <span style={badge}>critical risk</span>
        <span style={badge}>policy enforced</span>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,113,133,0.38)", background: "rgba(127,29,29,0.22)", borderRadius: 8, padding: 14, display: "grid", gap: 9 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#fecdd3" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const text: CSSProperties = { margin: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.86 };
const badgeRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7 };
const badge: CSSProperties = { border: "1px solid rgba(254,205,211,0.32)", background: "rgba(254,205,211,0.10)", color: "#fecdd3", borderRadius: 7, padding: "5px 7px", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
