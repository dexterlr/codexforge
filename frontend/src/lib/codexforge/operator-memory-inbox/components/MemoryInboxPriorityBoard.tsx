"use client";

import type { CSSProperties } from "react";
import type { OperatorMemoryInboxSummary } from "../operator-memory-inbox-types";

export function MemoryInboxPriorityBoard({ summary }: { summary: OperatorMemoryInboxSummary }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-priority-board="MemoryInboxPriorityBoard renders priority ranking is deterministic">
      <strong>Priority board</strong>
      <div style={grid}>
        <Metric label="Cards" value={String(summary.cardCount)} />
        <Metric label="Pending" value={String(summary.pendingReviewCount)} />
        <Metric label="Ready" value={String(summary.promotionReadyCount)} />
        <Metric label="Blocked" value={String(summary.blockedCount)} />
      </div>
      <p style={text}>{summary.nextSafeAction}</p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <span style={metric}><small>{label}</small><strong>{value}</strong></span>;
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 4, overflowWrap: "anywhere" };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
