"use client";

import type { CSSProperties } from "react";
import type { RegressionRollbackAdvice } from "../regression-triage-types";

export function RegressionRollbackAdvisorPanel({ advice }: { advice: RegressionRollbackAdvice }) {
  return (
    <section data-codexforge-regression-rollback-advisor-panel="RegressionRollbackAdvisorPanel renders git restore git revert" style={card}>
      <h3 style={title}>Rollback advisor</h3>
      <p style={body}>Advice only. Do not auto-rollback; preserve smoke output and inspect first.</p>
      {advice.options.map((option) => (
        <div key={option.optionId} style={row}>
          <strong>{option.title}</strong>
          <span>{option.reason}</span>
          {option.commandPreview ? <code style={code}>{option.commandPreview}</code> : null}
          <small>{option.warnings.join(" ")}</small>
        </div>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
const body: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 9, display: "grid", gap: 4, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const code: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.48)", borderRadius: 7, padding: 8, overflowWrap: "anywhere" };
