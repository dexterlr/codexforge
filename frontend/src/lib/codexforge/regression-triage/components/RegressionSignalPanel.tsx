"use client";

import type { CSSProperties } from "react";
import type { RegressionSignal } from "../regression-triage-types";

export function RegressionSignalPanel({ signals }: { signals: readonly RegressionSignal[] }) {
  return (
    <section data-codexforge-regression-signal-panel="RegressionSignalPanel renders" style={card}>
      <h3 style={title}>Regression signals</h3>
      <div style={stack}>
        {signals.map((signal) => (
          <div key={signal.id} style={row}>
            <strong>{signal.title}</strong>
            <span>{signal.snippet}</span>
            <small>
              {signal.type} - {signal.severity} - confidence {signal.confidence.toFixed(2)}
            </small>
            <small>{signal.relatedFiles.join(", ") || "No related files"}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
