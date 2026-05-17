"use client";

import type { CSSProperties } from "react";
import { summarizeApplyDryRunLedger, type ApplyDryRunLedger } from "../index";

type Props = {
  ledger: ApplyDryRunLedger;
};

export function DryRunLedgerPanel({ ledger }: Props) {
  return (
    <section
      style={card}
      data-codexforge-apply-diff-dry-run-ledger="DryRunLedgerPanel renders ledger includes policy-checked ledger includes dry-run-complete"
    >
      <span style={eyebrow}>Dry Run Ledger</span>
      <h3 style={title}>No-persistence result ledger</h3>
      <ul style={list}>{summarizeApplyDryRunLedger(ledger).map((item) => <li key={item}>{item}</li>)}</ul>
      <div style={timeline}>
        {ledger.items.map((item) => (
          <article key={item.id} style={eventCard}>
            <strong>{item.label}</strong>
            <span>{item.detail}</span>
            <code style={code}>{item.state}</code>
          </article>
        ))}
      </div>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(51,65,85,0.18)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#cbd5e1", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 15, letterSpacing: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#e2e8f0", fontSize: 12, lineHeight: 1.45 };
const timeline: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eventCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.38)", borderRadius: 8, display: "grid", gap: 4, padding: 9, color: "#e2e8f0", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const code: CSSProperties = { color: "#bfdbfe", fontSize: 11, whiteSpace: "normal", overflowWrap: "anywhere" };
