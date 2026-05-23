"use client";

import type { CSSProperties } from "react";
import type { CodingFlowCopyFix } from "../coding-flow-ux-fix-types";

export function CodingFlowCopyFixPanel({ fixes }: { fixes: CodingFlowCopyFix[] }) {
  return (
    <section style={panel} data-codexforge-coding-flow-copy-fix-panel="CodingFlowCopyFixPanel renders copy fixes include Pick a file Preview patch Fix code safely plain English no internal phase numbers">
      <h2 style={title}>Wording fixes</h2>
      <div style={grid}>
        {fixes.map((fix) => (
          <article key={fix.fixId} style={itemStyle}>
            <span style={small}>{fix.route}</span>
            <strong>{fix.afterLabel}</strong>
            <span style={small}>{fix.nextCopy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", minWidth: 0 };
const itemStyle: CSSProperties = { background: "rgba(15,23,42,0.58)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 };
const small: CSSProperties = { color: "#94a3b8", fontSize: 12, lineHeight: 1.35 };
