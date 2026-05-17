"use client";

import type { CSSProperties } from "react";
import { summarizeApplyExecutionAuditLedger, type ApplyExecutionAuditLedger } from "../index";

type Props = {
  ledger: ApplyExecutionAuditLedger;
};

export function ExecutionAuditLedgerPanel({ ledger }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-execution-ledger="ExecutionAuditLedgerPanel renders ledger includes user-dispatched ledger includes result-captured"
    >
      <div style={row}>
        <span style={eyebrow}>Audit Ledger</span>
        <span style={badge}>{ledger.items.length} events</span>
      </div>
      <h3 style={title}>Local execution gate audit</h3>
      <ul style={list}>{summarizeApplyExecutionAuditLedger(ledger).map((item) => <li key={item}>{item}</li>)}</ul>
      <ol style={list}>
        {ledger.items.map((item) => (
          <li key={item.id}>
            <strong>{item.label}:</strong> {item.detail}
          </li>
        ))}
      </ol>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(15,23,42,0.36)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#cbd5e1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 };
const badge: CSSProperties = { border: "1px solid rgba(148,163,184,0.28)", background: "rgba(148,163,184,0.12)", borderRadius: 8, padding: "4px 7px", color: "#e2e8f0", fontSize: 11, fontWeight: 900 };
