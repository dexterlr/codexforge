"use client";

import type { CSSProperties } from "react";
import type { CodingFlowPanelPriority } from "../coding-flow-ux-fix-types";

export function CodingFlowPanelPriorityPanel({ priorities }: { priorities: CodingFlowPanelPriority[] }) {
  return (
    <section style={panel} data-codexforge-coding-flow-panel-priority-panel="CodingFlowPanelPriorityPanel renders panel priority includes essential advanced debug raw JSON hidden advanced details are collapsed or visually secondary">
      <h2 style={title}>Panel priority</h2>
      <div style={grid}>
        {priorities.map((priority) => (
          <article key={priority.priorityId} style={itemStyle}>
            <strong>{priority.route}</strong>
            {priority.items.map((item) => <span key={item.itemId} style={small}>{item.priority}: {item.panel}</span>)}
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, display: "grid", gap: 12, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const grid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", minWidth: 0 };
const itemStyle: CSSProperties = { background: "rgba(15,23,42,0.58)", border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 6, minWidth: 0, padding: 10 };
const small: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.35 };
