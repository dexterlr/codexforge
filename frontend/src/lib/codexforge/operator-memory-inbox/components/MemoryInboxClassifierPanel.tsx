"use client";

import type { CSSProperties } from "react";
import type { MemoryInboxClassificationSummary } from "../operator-memory-inbox-types";

export function MemoryInboxClassifierPanel({ summary }: { summary: MemoryInboxClassificationSummary }) {
  return (
    <section style={panel} data-codexforge-memory-inbox-classifier-panel="MemoryInboxClassifierPanel renders classifier recognizes verification-result regression-lesson fix-pattern safety-boundary rollback-note">
      <strong>Classifier</strong>
      <div style={grid}>
        {Object.entries(summary.counts).filter(([, count]) => count > 0).map(([kind, count]) => (
          <span key={kind} style={pill}>{kind}: {count}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const grid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const pill: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "5px 8px", fontSize: 11, overflowWrap: "anywhere" };
