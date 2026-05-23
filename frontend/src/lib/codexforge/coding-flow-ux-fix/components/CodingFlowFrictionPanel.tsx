"use client";

import type { CSSProperties } from "react";
import type { CodingFlowFriction } from "../coding-flow-ux-fix-types";

export function CodingFlowFrictionPanel({ frictions }: { frictions: CodingFlowFriction[] }) {
  return (
    <section style={panel} data-codexforge-coding-flow-friction-panel="CodingFlowFrictionPanel renders friction includes too many panels unclear primary action wording too technical">
      <div style={header}>
        <span style={eyebrow}>Friction</span>
        <h2 style={title}>Trial friction to fix</h2>
      </div>
      <div style={grid}>
        {frictions.slice(0, 6).map((item) => (
          <article key={item.frictionId} style={itemStyle}>
            <span style={pill}>{item.priority}</span>
            <strong>{item.label}</strong>
            <span style={small}>{item.affectedRoute}</span>
            <p style={copy}>{item.userFacingSymptom}</p>
          </article>
        ))}
      </div>
      <details style={details}>
        <summary style={summary}>Advanced friction details</summary>
        <div style={grid}>
          {frictions.slice(6).map((item) => (
            <article key={item.frictionId} style={itemStyle}>
              <strong>{item.label}</strong>
              <span style={small}>{item.likelyCause}</span>
              <p style={copy}>{item.suggestedFix}</p>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const header: CSSProperties = { display: "grid", gap: 3 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", minWidth: 0 };
const itemStyle: CSSProperties = { background: "rgba(15,23,42,0.58)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 };
const pill: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900 };
const small: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.35 };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, margin: 0 };
const details: CSSProperties = { color: "#cbd5e1", fontSize: 12 };
const summary: CSSProperties = { cursor: "pointer", fontWeight: 900 };
