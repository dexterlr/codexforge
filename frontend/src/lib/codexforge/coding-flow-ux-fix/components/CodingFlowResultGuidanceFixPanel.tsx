"use client";

import type { CSSProperties } from "react";
import type { CodingFlowResultGuidanceFix } from "../coding-flow-ux-fix-types";

export function CodingFlowResultGuidanceFixPanel({ fixes }: { fixes: CodingFlowResultGuidanceFix[] }) {
  return (
    <section style={panel} data-codexforge-coding-flow-result-guidance-fix-panel="CodingFlowResultGuidanceFixPanel renders result guidance includes validation passed validation failed apply blocked output missing needs closed-loop">
      <h2 style={title}>Result guidance</h2>
      <div style={grid}>
        {fixes.map((fix) => (
          <article key={fix.outcomeId} style={itemStyle}>
            <strong>{fix.title}</strong>
            <span style={small}>{fix.meaning}</span>
            <span style={small}>Next: {fix.nextAction}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", minWidth: 0 };
const itemStyle: CSSProperties = { background: "rgba(15,23,42,0.58)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 };
const small: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
