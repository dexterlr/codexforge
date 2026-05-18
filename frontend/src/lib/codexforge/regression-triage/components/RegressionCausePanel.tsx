"use client";

import type { CSSProperties } from "react";
import type { RegressionSuspectedCause } from "../regression-triage-types";

export function RegressionCausePanel({ suspectedCause }: { suspectedCause: RegressionSuspectedCause }) {
  return (
    <section data-codexforge-regression-cause-panel="RegressionCausePanel renders" style={card}>
      <h3 style={title}>Suspected causes</h3>
      {suspectedCause.candidates.map((cause) => (
        <div key={cause.causeId} style={row}>
          <strong>{cause.title}</strong>
          <span>{cause.reason}</span>
          <small>Inspect: {cause.suggestedInspection}</small>
          <small>Safe next action: {cause.safeNextAction}</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(15,23,42,0.72)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
