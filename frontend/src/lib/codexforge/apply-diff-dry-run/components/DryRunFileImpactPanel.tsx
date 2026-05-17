"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDryRunFileImpact, type ApplyDryRunFileImpact } from "../index";

type Props = {
  impact: ApplyDryRunFileImpact;
};

export function DryRunFileImpactPanel({ impact }: Props) {
  return (
    <section style={card} data-codexforge-apply-diff-dry-run-file-impact="DryRunFileImpactPanel renders">
      <span style={eyebrow}>Dry Run File Impact</span>
      <h3 style={title}>Affected file validation</h3>
      <ul style={list}>{summarizeApplyDryRunFileImpact(impact).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={stack}>
        {impact.items.map((item) => (
          <article key={item.id} style={itemCard}>
            <strong>{item.filePath}</strong>
            <span>Intent: {item.operationIntent}; risk: {item.riskLevel}</span>
            <span>{item.expectedChangeSummary}</span>
            <span>Verification: {item.verificationRequirement}</span>
            <span>Rollback: {item.rollbackRequirement}</span>
            {item.conflictWarning ? <span style={warning}>{item.conflictWarning}</span> : null}
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(168,85,247,0.18)", background: "rgba(88,28,135,0.14)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#c4b5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#ede9fe", fontSize: 12, lineHeight: 1.45 };
const stack: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const itemCard: CSSProperties = { border: "1px solid rgba(196,181,253,0.16)", background: "rgba(15,23,42,0.38)", borderRadius: 8, display: "grid", gap: 4, padding: 9, color: "#ede9fe", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const warning: CSSProperties = { color: "#fde68a", fontWeight: 800 };
