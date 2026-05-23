"use client";

import type { CSSProperties } from "react";
import type { CodingFlowRouteHandoffFixItem } from "../coding-flow-ux-fix-types";

export function CodingFlowRouteHandoffFixPanel({ items, onCopy }: { items: CodingFlowRouteHandoffFixItem[]; onCopy: (label: string, value: string) => void }) {
  const payload = items.map((item) => `${item.sourceRoute} -> ${item.destinationRoute}: ${item.label}. Bring: ${item.whatToBring}. Outcome: ${item.expectedOutcome}.`).join("\n");
  return (
    <section style={panel} data-codexforge-coding-flow-route-handoff-fix-panel="CodingFlowRouteHandoffFixPanel renders route handoff includes /code-flow to /files /apply-validation to /validation /validation to /workflow-results avoid duplicate links">
      <div style={header}>
        <h2 style={title}>Route handoffs</h2>
        <button type="button" style={button} onClick={() => onCopy("route handoff checklist", payload)}>Copy route handoff checklist</button>
      </div>
      <div style={grid}>
        {items.map((item) => (
          <article key={item.handoffId} style={itemStyle}>
            <strong>{item.label}</strong>
            <span style={small}>{item.sourceRoute} to {item.destinationRoute}</span>
            <span style={small}>{item.expectedOutcome}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between", minWidth: 0 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const button: CSSProperties = { background: "#5eead4", border: 0, borderRadius: 8, color: "#042f2e", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", minWidth: 0 };
const itemStyle: CSSProperties = { background: "rgba(15,23,42,0.58)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 };
const small: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
