"use client";

import type { CSSProperties } from "react";
import type { RegressionFixQueueReadinessItem } from "../regression-fix-queue-types";

export function RegressionFixQueueReadinessPanel({ readiness }: { readiness: RegressionFixQueueReadinessItem }) {
  return (
    <section
      style={panel}
      data-codexforge-regression-fix-queue-readiness-panel="RegressionFixQueueReadinessPanel renders readiness includes rollback advice readiness includes suggested smoke scripts mutation blocked"
    >
      <div style={header}>
        <h3 style={title}>Readiness</h3>
        <span style={badge}>{readiness.status}</span>
      </div>
      <div style={checks}>
        {readiness.checks.map((check) => (
          <div key={check.id} style={checkRow}>
            <strong>{check.label}</strong>
            <span>{check.status}</span>
            <small>{check.detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(14,165,233,0.08)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between" };
const title: CSSProperties = { fontSize: 15, letterSpacing: 0, margin: 0 };
const badge: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 11, fontWeight: 900, padding: "5px 7px" };
const checks: CSSProperties = { display: "grid", gap: 7 };
const checkRow: CSSProperties = { border: "1px solid rgba(125,211,252,0.12)", borderRadius: 8, color: "#e0f2fe", display: "grid", fontSize: 12, gap: 3, overflowWrap: "anywhere", padding: 8 };
