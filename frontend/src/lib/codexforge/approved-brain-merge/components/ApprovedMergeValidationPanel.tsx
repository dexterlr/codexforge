"use client";

import type { CSSProperties } from "react";
import type { ApprovedBrainMergeValidation } from "../approved-brain-merge-types";

export function ApprovedMergeValidationPanel({
  validation,
}: {
  validation: ApprovedBrainMergeValidation;
}) {
  return (
    <section style={panel} data-codexforge-approved-merge-validation="validation detects duplicate/conflict risk">
      <h3 style={title}>Approved Merge Validation</h3>
      <div style={metric}><span>State</span><strong>{validation.state}</strong></div>
      <ul style={list}>
        {validation.summary.map((line) => <li key={line}>{line}</li>)}
      </ul>
      {validation.findings.length ? (
        <div style={findings}>
          {validation.findings.map((finding) => (
            <article key={finding.id} style={findingItem}>
              <strong>{finding.severity}: {finding.issue}</strong>
              <span>{finding.message}</span>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

const safe: CSSProperties = { overflowWrap: "anywhere", wordBreak: "break-word" };
const panel: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(2,6,23,0.36)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const title: CSSProperties = { margin: 0, fontSize: 16, ...safe };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 8, display: "grid", gap: 4, minWidth: 0, ...safe };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, ...safe };
const findings: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const findingItem: CSSProperties = { border: "1px solid rgba(251,191,36,0.18)", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: 10, display: "grid", gap: 4, fontSize: 12, ...safe };
